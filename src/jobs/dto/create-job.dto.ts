import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 1, description: 'The ID of the category' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: 'Web Developer', description: 'The name of the job' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The URL of the job picture',
  })
  @IsString()
  @IsOptional()
  picture?: string;
}
