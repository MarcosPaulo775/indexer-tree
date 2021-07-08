import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from './config';
import { ChokidarModule } from './modules/chokidar/chokidar.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
export class AppModule {}
