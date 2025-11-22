import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ContentDto {
  @IsString()
  text: string;
}

export class CreateTreeDto {
  @IsString()
  username: string;

  @ValidateNested()
  @Type(() => ContentDto)
  content: ContentDto;

  @IsArray()
  @IsString({ each: true })
  histories: string[];
}
