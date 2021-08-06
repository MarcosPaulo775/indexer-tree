import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FileDto } from './models/file.dto';
import { FileDocument } from './models/file.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel('File') private readonly fileModel: Model<FileDocument>
  ) {}

  async create(fileDto: FileDto): Promise<FileDocument> {
    return await this.fileModel.create(fileDto);
  }

  async update(id: string, fileDto: FileDto): Promise<string> {
    const file = await this.fileModel.findById(id).exec();

    if (!file) {
      return 'File not found!';
    }

    const resp = await this.fileModel
      .updateOne({ _id: id }, { $set: { ...fileDto } })
      .exec();

    return resp.ok === 1
      ? 'File updated successfully!'
      : 'Error updating file!';
  }

  async delete(id: string): Promise<boolean> {
    const resp = await this.fileModel.deleteOne({ _id: id }).exec();
    return resp.ok === 1;
  }

  async findOneByNameAndPathAndIsDirectory(
    name: string,
    path: string[],
    isDirectory: boolean
  ): Promise<FileDocument | null> {
    return await this.fileModel.findOne({ name, path, isDirectory }).exec();
  }

  async isIndexed(name: string, path: string[]): Promise<boolean> {
    return (await this.fileModel.findOne({ name, path }).exec()) ? true : false;
  }
}
