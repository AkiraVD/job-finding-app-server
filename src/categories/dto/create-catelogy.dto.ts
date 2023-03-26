import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Digital Marketing',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
