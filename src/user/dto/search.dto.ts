import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}

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
