import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MiddlewareBuilder } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

import config from './config';
import { ChokidarModule } from './modules/chokidar/chokidar.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: config?.redis,
    }),
    MongooseModule.forRoot(config?.mongo?.uri, config?.mongo?.options),
    ChokidarModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(@InjectQueue(config.bull.queue) private fileQueue: Queue) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.fileQueue)]);
    consumer.apply(router).forRoutes('/bull-board');
  }
}
