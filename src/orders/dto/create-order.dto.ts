import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    type: Number,
    description: 'ID of the gig',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  gigId: number;
}
