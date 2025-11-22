import { Injectable, NotFoundException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { PrismaService } from '@db/services';
import { toDto, TreeResponseDto } from './getTree.dto';

@Injectable()
export class GetTreeService {
  constructor(private readonly dbContext: PrismaService) {}

  async getTreeById(id: number): Promise<TreeResponseDto> {
    const tree = await this.dbContext.tree.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!tree) {
      throw new NotFoundException(`Tree with ID ${id} not found`);
    }

    // Fetch tree data from Google Cloud Storage
    let treeData = null;
    const storage = new Storage();
    const bucket_name = 'knowledge-bonsai';

    try {
      if (tree.bucket_url && tree.bucket_url.includes('/')) {
        const [fileContent] = await storage
          .bucket(bucket_name)
          .file(tree.bucket_url)
          .download();

        if (fileContent && fileContent.length > 0) {
          treeData = JSON.parse(fileContent.toString('utf8'));
        } else {
          console.warn('⚠️ File content is empty');
        }
      } else {
        console.warn('⚠️ Invalid bucket URL:', {
          url: tree.bucket_url,
          hasValue: !!tree.bucket_url,
          hasSlash: tree.bucket_url?.includes('/'),
        });
      }
    } catch (error) {
      console.error('❌ Error fetching tree data from GCS:', {
        bucket: bucket_name,
        path: tree.bucket_url,
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        errorCode: error?.code,
      });
      treeData = null; // Explicitly set to null
    }

    return toDto({ ...tree, treeData });
  }
}
