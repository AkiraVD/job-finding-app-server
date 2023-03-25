import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGigDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  jobId?: number;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  descShort?: string;

  @IsOptional()
  @IsNumber()
  stars?: number;
}
