import { DocumentBuilder } from '@nestjs/swagger';

export const SwggerConfig = new DocumentBuilder()
  .setTitle('NestJS - Fiverr API')
  .setDescription('Documentation of Backend API for Fiverr App')
  .addBearerAuth()
  .setExternalDoc(
    'Watch Video Demo',
    'https://www.youtube.com/watch?v=cHkIkHzDq9ks',
  )
  .build();
