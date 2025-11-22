import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { PrismaService } from '@db/services';
import { GetListTreeDto } from './getListTree.dto';

@Injectable()
export class GetListTreeService {
  constructor(private readonly dbContext: PrismaService) {}

  async getListTrees(query: GetListTreeDto): Promise<any> {
    const { search, ownerId, page = 1, limit = 10 } = query;

    // Build the where clause
    const where = {
      OR: search
        ? [
            { title: { contains: search, mode: 'insensitive' as const } },
            {
              owner: {
                name: { contains: search, mode: 'insensitive' as const },
              },
            },
          ]
        : undefined,
      ...(ownerId && { ownerId }),
    };

    const trees = await this.dbContext.tree.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
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

    return trees;
  }
}
