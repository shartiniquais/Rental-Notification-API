import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforme le JSON en instances de DTO
      whitelist: true, // Supprime les propriétés inattendues
      forbidNonWhitelisted: true, // Rejette les champs non autorisés
    }),
  );

  await app.listen(3000);
}
bootstrap();
