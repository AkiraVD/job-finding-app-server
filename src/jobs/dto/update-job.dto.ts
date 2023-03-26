import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
  @ApiProperty({ example: 'Web Developer', description: 'The name of the job' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The URL of the job picture',
  })
  @IsString()
  @IsOptional()
  picture?: string;
}
