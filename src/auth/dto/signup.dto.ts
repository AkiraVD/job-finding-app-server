import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({ example: 'https://example.com/profile.png' })
  @IsString()
  @IsOptional()
  profilePic?: string;

  @ApiProperty({ example: 'Male' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'user' })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: ['JavaScript', 'React'] })
  @IsString()
  @IsOptional()
  skills?: string;

  @ApiProperty({ example: ['AWS Certified Developer', 'CompTIA A+'] })
  @IsString()
  @IsOptional()
  certifications?: string;
}
