import { IsString, IsNumber } from 'class-validator';

export class CreateQuizDto {
  @IsNumber()
  treeId: number;

  @IsString()
  username: string;
}
