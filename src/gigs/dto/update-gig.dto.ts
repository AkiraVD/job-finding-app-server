import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGigDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Title of the gig',
    example: 'Professional Logo Design',
  })
  title?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'ID of the job associated with the gig',
    example: 1,
  })
  jobId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Rate of the gig',
    example: 5,
  })
  rate?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Price of the gig',
    example: 100,
  })
  price?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'URL of the picture for the gig',
    example: 'https://example.com/logo.png',
  })
  picture?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Description of the gig',
    example: 'I will design a professional logo for your business',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Short description of the gig',
    example: 'Professional Logo Design',
  })
  descShort?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Number of stars for the gig',
    example: 4,
  })
  stars?: number;
}
