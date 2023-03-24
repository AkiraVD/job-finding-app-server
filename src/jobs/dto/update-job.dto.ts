import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  picture?: string;
}
