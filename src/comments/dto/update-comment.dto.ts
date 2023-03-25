import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  @IsOptional()
  star: number;
}
