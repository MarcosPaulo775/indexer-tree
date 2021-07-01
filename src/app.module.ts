import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ChokidarModule } from './modules/chokidar/chokidar.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        password: process.env.REDIS_PASS,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        authSource: 'admin',
      }
    ),
    ChokidarModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
