import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  picture?: string;
}
