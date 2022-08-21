import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cors());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
