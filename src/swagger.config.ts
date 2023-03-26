import { DocumentBuilder } from '@nestjs/swagger';

export const SwggerConfig = new DocumentBuilder()
  .setTitle('Swagger')
  .setDescription('API for Fiverr Clone')
  .addBearerAuth()
  .build();
