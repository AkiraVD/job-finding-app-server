import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { toNumber } from './string2Number';

export class SearchDto {
  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber()
  item: number = 10;

  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  @IsNumber()
  page: number = 0;

  @IsString()
  name: string = '';
}
