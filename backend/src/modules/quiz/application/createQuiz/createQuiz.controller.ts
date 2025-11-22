import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateQuizService } from './createQuiz.service';
import { CreateQuizDto } from './createQuiz.dto';

@Controller()
export class CreateQuizController {
  constructor(private readonly createQuizService: CreateQuizService) {}

  @Post('/quizzes/:treeId')
  async createQuiz(
    @Param('treeId', ParseIntPipe) treeId: number,
    @Body() data: CreateQuizDto,
  ): Promise<any> {
    return await this.createQuizService.createQuiz(treeId, data);
  }
}
