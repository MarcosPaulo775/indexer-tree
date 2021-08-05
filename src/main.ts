import { NestFactory } from '@nestjs/core';

import { ChokidarService } from '@modules/chokidar/chokidar.service';

import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  console.log(process.env.ENV_FILE);
  console.log(config);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const chokidarService = app.get<ChokidarService>(ChokidarService);
  chokidarService.startChokidar(config.ignoreInitial);
}
bootstrap();
