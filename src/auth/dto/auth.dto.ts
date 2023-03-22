import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  birthday?: String;

  @IsString()
  @IsOptional()
  phone?: String;

  @IsString()
  @IsOptional()
  fullname?: String;

  @IsString()
  @IsOptional()
  profilePic?: String;

  @IsString()
  @IsOptional()
  gender?: String;

  @IsString()
  @IsOptional()
  role?: String;

  @IsString()
  @IsOptional()
  skills?: String;

  @IsString()
  @IsOptional()
  certifications?: String;
}
