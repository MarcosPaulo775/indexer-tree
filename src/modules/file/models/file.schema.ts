import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class File {
  @Prop() name!: string;
  @Prop() path!: string[];
  @Prop() isDirectory!: boolean;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
