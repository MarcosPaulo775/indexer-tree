import { BullModule, BullQueueProcessor, InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '@shared/shared.module';

import { FileService } from './file.service';
import { FileProducerService } from './jobs/file-producer.service';
import { FileConsumer } from './jobs/file.consumer';
import { FileSchema } from './models/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'File', schema: FileSchema, collection: 'files' },
    ]),
    BullModule.registerQueue({
      name: 'fileIndexer',
      limiter: {
        max: 100,
        duration: 60000,
      },
    }),
    SharedModule,
  ],
  providers: [FileService, FileProducerService, FileConsumer],
  exports: [FileService, FileProducerService, FileConsumer, BullModule],
})
export class FileModule {}
