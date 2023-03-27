import { DocumentBuilder } from '@nestjs/swagger';

export const SwggerConfig = new DocumentBuilder()
  .setTitle('NestJS - Fiverr API')
  .setDescription('Documentation of Backend API for Fiverr App')
  .addBearerAuth()
  .build();
