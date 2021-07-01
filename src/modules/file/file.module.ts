import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileService } from './file.service';
import { FileSchema } from './models/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'File', schema: FileSchema, collection: 'files' },
    ]),
  ],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
