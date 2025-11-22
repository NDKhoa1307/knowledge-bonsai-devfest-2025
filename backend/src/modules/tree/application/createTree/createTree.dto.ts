import { IsString, MinLength } from 'class-validator';

export class CreateTreeDto {
  @IsString()
  @MinLength(3)
  prompt: string;

  @IsString()
  username: string;
}
