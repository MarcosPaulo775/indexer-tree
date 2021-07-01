import { Document } from 'mongoose';

export interface File extends Document {
  name: string;
  path: string[];
  isDirectory: boolean;
  base64?: string;
}
