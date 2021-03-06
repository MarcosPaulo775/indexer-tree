import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '@shared/shared.module';

import config from '../../config';
import { FileService } from './file.service';
import { FileProducerService } from './jobs/file-producer.service';
import { FileConsumer } from './jobs/file.consumer';
import { FileSchema } from './models/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'File', schema: FileSchema, collection: config.mongoCollection },
    ]),
    BullModule.registerQueue({
      name: config.bull.queue,
      limiter: {
        max: config.bull.max,
        duration: 1000,
      },
    }),
    SharedModule,
  ],
  providers: [FileService, FileProducerService, FileConsumer],
  exports: [FileService, FileProducerService, FileConsumer, BullModule],
})
export class FileModule {}
