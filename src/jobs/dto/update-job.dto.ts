import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;
}
