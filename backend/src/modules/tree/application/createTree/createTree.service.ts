import { GoogleGenAI } from '@google/genai';
import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/services';
import { CreateTreeDto } from './createTree.dto';
import { KnowledgeTreeDataSchema } from './createTree.schema';
import { createTreeSystemPrompt as system_prompt } from '../../prompts';

import { zodToJsonSchema } from 'zod-to-json-schema';

@Injectable()
export class CreateTreeService {
  private readonly api_key: string;

  constructor(private readonly dbContext: PrismaService) {
    this.api_key = process.env.GEMINI_API_KEY || '';

    if (!this.api_key.length) {
      throw new Error('GEMINI_API_KEY environment variable is not set.');
    }
  }

  async createTree(data: CreateTreeDto): Promise<{ id: string; data: any }> {
    const prompt = data.content.text.trim();
    const username = data.username.trim();

    const content = await this.generateContent(
      `Create a detailed tree structure based on the following prompt: ${prompt}`,
    );

    const newTreeObj = await this.saveTreeToDB(username, content);

    return {
      id: newTreeObj.id,
      data: content,
    };
  }

  async generateContent(prompt: string): Promise<any> {
    const ai = new GoogleGenAI({});

    const jsonSchema = zodToJsonSchema(KnowledgeTreeDataSchema);

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

    const parsedData = KnowledgeTreeDataSchema.parse(JSON.parse(responseText));

    if (!parsedData) {
      throw new Error('Failed to generate content from the AI model.');
    }

    return parsedData;
  }

  async saveTreeToDB(username: string, treeData: any): Promise<any> {
    let user = await this.dbContext.user.findFirst({
      where: { email: username },
    });

    if (!user) {
      user = await this.dbContext.user.create({
        data: { email: username, name: username },
      });
    }

    const title = treeData.metadata.title || 'Untitled Tree';

    const bucket_name = 'knowledge-bonsai';
    const object_key = `trees/${user.id}/${Date.now()}_tree.json`;

    try {
      const storage = new Storage();

      await storage
        .bucket(bucket_name)
        .file(object_key)
        .save(JSON.stringify(treeData), {
          contentType: 'application/json',
        });

      return await this.dbContext.tree.create({
        data: {
          ownerId: user.id,
          title: title,
          bucket_url: object_key,
        },
        select: { id: true },
      });
    } catch (error) {
      console.error('❌ Error saving tree to GCS or DB:', error);
      throw new Error('Failed to save tree data.');
    }
  }
}
