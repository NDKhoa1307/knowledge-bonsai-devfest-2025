import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@db';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule {}
