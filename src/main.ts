import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = 3001;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  await app.listen(port);
}
bootstrap();
