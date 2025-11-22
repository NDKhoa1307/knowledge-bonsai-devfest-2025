import { Controller, Post, Body } from '@nestjs/common';
import { CreateQuizService } from './createQuiz.service';
import { CreateQuizDto } from './createQuiz.dto';

@Controller()
export class CreateQuizController {
  constructor(private readonly createQuizService: CreateQuizService) {}

  @Post('/quizzes')
  async createQuiz(@Body() data: CreateQuizDto): Promise<any> {
    return await this.createQuizService.createQuiz(data);
  }
}
