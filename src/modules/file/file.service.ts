import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { File } from './models/file.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectModel('File') private readonly freightModel: Model<File>
  ) {}

  async create(
    name: string,
    path: string[],
    isDirectory: boolean
  ): Promise<File> {
    return await this.freightModel.create({ name, path, isDirectory });
  }

  async update(id: string, name: string, path: string[]): Promise<File | null> {
    return await this.freightModel
      .findByIdAndUpdate(id, { $set: { name, path } })
      .exec();
  }

  async isIndexed(name: string, path: string[]): Promise<File | null> {
    return await this.freightModel.findOne({ name, path }).exec();
  }
}
