import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    description: 'Comment content',
    example: 'Example comment',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: Number,
    description: 'Star to rate the gig',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  star: number;

  @ApiProperty({
    type: Number,
    description: 'Gig ID where the comment associated with',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  gigId: number;
}
