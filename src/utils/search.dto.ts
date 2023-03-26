import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { toNumber } from './string2Number';

export class SearchDto {
  @ApiProperty({
    description: 'Number of items to return in one page',
    example: 10,
  })
  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber()
  item: number = 10;

  @ApiProperty({ description: 'Page number to return', example: 0 })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsNumber()
  page: number = 0;

  @ApiProperty({ description: 'Search keyword' })
  @IsString()
  name: string = '';
}

export class SearchDtoNoName {
  @ApiProperty({
    description: 'Number of items in one page',
    example: 10,
  })
  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber()
  item: number = 10;

  @ApiProperty({ description: 'Page number', example: 0 })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsNumber()
  page: number = 0;
}
