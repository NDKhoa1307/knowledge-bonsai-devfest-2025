import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/services';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
