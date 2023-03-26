import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '2000-01-01',
  })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiProperty({
    example: '123-456-7890',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({
    example: 'https://example.com/profile.png',
  })
  @IsString()
  @IsOptional()
  profilePic?: string;

  @ApiProperty({
    example: 'male',
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'USER' })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({
    example: ['JavaScript', 'Node.js'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string;

  @ApiProperty({
    example: ['AWS Certified Developer', 'CompTIA A+'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string;
}
