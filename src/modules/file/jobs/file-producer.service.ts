import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue('fileIndexer') private fileQueue: Queue) {}

  async addFile(url: string) {
    this.fileQueue.add('addFile', url, { delay: 1000 });
  }

  async addDir(url: string) {
    this.fileQueue.add('addDir', url, { delay: 1000 });
  }

  async unlinkFile(url: string) {
    this.fileQueue.add('unlinkFile', url, { delay: 1000 });
  }

  async unlinkDir(url: string) {
    this.fileQueue.add('unlinkDir', url, { delay: 1000 });
  }
}
