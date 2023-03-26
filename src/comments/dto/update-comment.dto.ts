import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    type: String,
    description: 'Update comment content',
    example: 'Example update comment',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    type: Number,
    description: 'Update star',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  star: number;
}
