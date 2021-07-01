import { Schema } from 'mongoose';

export const FileSchema = new Schema(
  {
    name: { type: String, nullable: false },
    path: { type: [String], nullable: false },
    isDirectory: { type: Boolean, nullable: false, default: false },
    base64: { type: String, nullable: true, default: null },
  },
  { versionKey: false }
);
