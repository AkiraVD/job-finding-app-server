import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { SwggerConfig } from './swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static('.'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, SwggerConfig);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(8080);
}
bootstrap();
