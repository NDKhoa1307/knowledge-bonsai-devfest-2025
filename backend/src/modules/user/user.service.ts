import { Injectable } from '@nestjs/common';
import { PrismaService } from '@db/services';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly dbContext: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.dbContext.user.create({
      data,
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.dbContext.user.findUnique({
      where: { id: userId },
    });
  }

  async getUsers(query: { skip?: number; take?: number }): Promise<User[]> {
    const { skip, take } = query;
    return this.dbContext.user.findMany({
      skip,
      take,
    });
  }

  async updateUser(
    userId: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.dbContext.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId: number): Promise<User> {
    return this.dbContext.user.delete({
      where: { id: userId },
    });
  }
}
