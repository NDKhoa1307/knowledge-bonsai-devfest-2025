import { GoogleGenAI } from '@google/genai';
import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/services';
import { CreateQuizDto } from './createQuiz.dto';
import { QuizDataSchema } from './createQuiz.schema';
import { createQuizSystemPrompt as system_prompt } from '../../prompts';
import { zodToJsonSchema } from 'zod-to-json-schema';

@Injectable()
export class CreateQuizService {
  private readonly api_key: string;

  constructor(private readonly dbContext: PrismaService) {
    this.api_key = process.env.GEMINI_API_KEY || '';

    if (!this.api_key.length) {
      throw new Error('GEMINI_API_KEY environment variable is not set.');
    }
  }

  async createQuiz(treeId: number, data: CreateQuizDto): Promise<string> {
    const username = data.username.trim();

    // Verify tree exists
    const tree = await this.dbContext.tree.findUnique({
      where: { id: treeId },
    });

    if (!tree) {
      throw new Error(`Tree with id ${treeId} not found.`);
    }

    // Get tree data from GCS
    const treeData = await this.getTreeDataFromGCS(tree.bucket_url);

    const content = await this.generateContent(
      `Create quiz questions and answers based on the following knowledge tree structure: ${JSON.stringify(treeData)}`,
    );

    await this.saveQuizToDB(username, treeId, content);

    return content;
  }

  async getTreeDataFromGCS(bucketUrl: string): Promise<any> {
    const bucket_name = 'knowledge-bonsai';
    const storage = new Storage();

    const file = storage.bucket(bucket_name).file(bucketUrl);
    const [contents] = await file.download();

    return JSON.parse(contents.toString());
  }

  async generateContent(prompt: string): Promise<any> {
    const ai = new GoogleGenAI({});

    const jsonSchema = zodToJsonSchema(QuizDataSchema);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: jsonSchema,
        systemInstruction: system_prompt,
      },
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error('No response from the AI model.');
    }

    const parsedData = QuizDataSchema.parse(JSON.parse(responseText));

    if (!parsedData) {
      throw new Error('Failed to generate content from the AI model.');
    }

    return parsedData;
  }

  async saveQuizToDB(
    username: string,
    treeId: number,
    quizData: any,
  ): Promise<void> {
    let user = await this.dbContext.user.findFirst({
      where: { email: username },
    });

    if (!user) {
      user = await this.dbContext.user.create({
        data: { email: username, name: username },
      });
    }

    // Save each quiz item to the database
    for (const quiz of quizData.quizzes) {
      await this.dbContext.quiz.create({
        data: {
          treeId: treeId,
          question: quiz.question,
          answer: quiz.answer,
        },
      });
    }
  }
}
