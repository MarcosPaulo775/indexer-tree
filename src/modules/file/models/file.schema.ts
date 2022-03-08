import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { S3 } from './file.dto';

@Schema({ versionKey: false })
export class File {
  @Prop() name!: string;
  @Prop() path!: string[];
  @Prop() isDirectory!: boolean;

  @Prop() s3?: S3;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
