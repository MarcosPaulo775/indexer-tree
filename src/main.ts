import { NestFactory } from '@nestjs/core';

import { ChokidarService } from '@modules/chokidar/chokidar.service';

import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const appService = app.get<AppService>(AppService);
  const chokidarService = app.get<ChokidarService>(ChokidarService);

  if (!appService.checkApp()) {
    chokidarService.startChokidar();
  }
}
bootstrap();
