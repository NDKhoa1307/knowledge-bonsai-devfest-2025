import { IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  username: string;
}
