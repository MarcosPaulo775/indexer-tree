import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class File {
  @Prop() name!: string;
  @Prop() path!: string[];
  @Prop() isDirectory!: boolean;
  @Prop({ type: String, required: false }) base64!: string | null;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
