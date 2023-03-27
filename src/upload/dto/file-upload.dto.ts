import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FileDeleteDto {
  @ApiProperty({
    type: 'string',
    example: 'https://exampleUrl.com/public/images/picture.jpg',
  })
  filePath: string;
}
