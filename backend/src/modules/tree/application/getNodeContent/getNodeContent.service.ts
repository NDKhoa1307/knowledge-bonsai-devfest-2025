import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { PrismaService } from '@db/services';
import { GcpBucketService } from '@/services/gcp_bucket.service';

import { getNodeContentSystemPrompt as system_prompt } from '../../prompts';

@Injectable()
export class GetNodeContentService {
  private readonly api_key: string;

  constructor(
    private readonly dbContext: PrismaService,
    private readonly gcpBucketService: GcpBucketService,
  ) {
    this.api_key = process.env.GEMINI_API_KEY || '';

    if (!this.api_key.length) {
      throw new Error('GEMINI_API_KEY environment variable is not set.');
    }
  }

  async getNodeContent(treeid: number, nodeid: string): Promise<any> {
    const tree = await this.dbContext.tree.findUnique({
      where: { id: treeid },
    });

    if (!tree) {
      throw new Error('Tree not found');
    }
    const bucket_url = tree.bucket_url;
    const { bucketName, objectKey } =
      this.gcpBucketService.parseGcsUrl(bucket_url);

    const tree_content = await this.gcpBucketService.getObject(objectKey);
    console.log(`Tree content retrieved from bucket: ${tree_content}`);

    console.log(`"id": "${nodeid}"`);
    if (!tree_content.includes(`"id":"${nodeid}"`)) {
      throw new Error('Node not found in tree content');
    }

    const node_content_folder = `trees/${treeid}/nodes/${nodeid}.txt`;
    const exist =
      await this.gcpBucketService.checkExistence(node_content_folder);

    if (exist) {
      const node_content =
        await this.gcpBucketService.getObject(node_content_folder);
      console.log(`Node content retrieved from bucket: ${node_content}`);
      return node_content.toString();
    } else {
      const generated_content = await this.generateNodeContent(
        treeid,
        nodeid,
        tree_content.toString(),
      );
      return generated_content;
    }
  }

  private async generateNodeContent(
    treeid: number,
    nodeid: string,
    tree_content: string,
  ) {
    const ai = new GoogleGenAI({});

    const node_content = this.findNodeByIdFromString(tree_content, nodeid);

    console.log(`Node content to be sent to AI model: ${node_content}`);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here are the found results: ${node_content}, generate content ONLY for "id": "${nodeid}"`,
      config: {
        systemInstruction: system_prompt,
      },
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error('No response from the AI model.');
    }

    return responseText;
  }

  findNodeByIdFromString(treeJsonString: string, nodeId: string) {
    // Create a search pattern for exact ID match at the start of an object
    const searchPattern = `"id":"${nodeId}"`;

    let searchIndex = 0;

    // Keep searching until we find an exact match
    while (true) {
      const idIndex = treeJsonString.indexOf(searchPattern, searchIndex);

      if (idIndex === -1) {
        return null; // Node ID not found
      }

      // Find the start of the object (backtrack to find the opening brace)
      const startIndex = treeJsonString.lastIndexOf('{', idIndex);

      // Check if this is an exact match by looking at what comes after the ID
      // The next character after "id":"A1" should be a comma or closing brace
      const afterIdIndex = idIndex + searchPattern.length;
      const nextChar = treeJsonString[afterIdIndex];

      // If it's an exact match (not "A1.1" or "A10"), process this node
      if (nextChar === ',' || nextChar === '}') {
        // Find the end of just this object's direct properties
        // We want to stop before including nested children's full content
        let endIndex = startIndex + 1;
        let braceCount = 1;
        let inString = false;
        const inChildrenArray = false;
        const childrenDepth = 0;

        for (let i = startIndex + 1; i < treeJsonString.length; i++) {
          const char = treeJsonString[i];

          // Track if we're inside a string
          if (char === '"' && treeJsonString[i - 1] !== '\\') {
            inString = !inString;
          }

          if (!inString) {
            if (char === '{') {
              braceCount++;
            } else if (char === '}') {
              braceCount--;
              if (braceCount === 0) {
                endIndex = i + 1;
                break;
              }
            }
          }
        }

        // Extract the complete node object
        return treeJsonString.substring(startIndex, endIndex);
      }

      // Not an exact match, continue searching after this position
      searchIndex = idIndex + 1;
    }
  }
}
