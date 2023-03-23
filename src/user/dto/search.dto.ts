import { IsNumber, IsString } from 'class-validator';

export class SearchDto {
  @IsNumber()
  item: number = 10;

  @IsNumber()
  page: number = 0;

  @IsString()
  name: string = '';
}
