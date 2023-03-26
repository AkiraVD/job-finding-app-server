import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class EditMeDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'newpassword' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiProperty({ example: '123-456-7890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsString()
  @IsOptional()
  profilePic?: string;

  @ApiProperty({ example: 'male' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: ['JavaScript', 'React'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string;

  @ApiProperty({ example: ['AWS Certified Developer', 'CompTIA A+'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string;
}
