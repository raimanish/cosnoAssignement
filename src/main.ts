import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const options = {
    origin: '*',
  };
  app.enableCors(options);

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
