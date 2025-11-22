import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user';
import { TreeModule } from './modules/tree';
import { QuizModule } from './modules/quiz';

@Module({
  imports: [
    UserModule,
    TreeModule,
    QuizModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
