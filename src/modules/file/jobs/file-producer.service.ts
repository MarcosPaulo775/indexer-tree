import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import config from '../../../config';

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue(config.bull.queue) private fileQueue: Queue) {}

  async addFile(url: string) {
    await this.fileQueue.add('addFile', url, { delay: 1000 }).catch((e) => e);
  }

  async addDir(url: string) {
    this.fileQueue.add('addDir', url, { delay: 1000 }).catch((e) => e);
  }

  async unlinkFile(url: string) {
    this.fileQueue.add('unlinkFile', url, { delay: 1000 }).catch((e) => e);
  }

  async unlinkDir(url: string) {
    this.fileQueue.add('unlinkDir', url, { delay: 1000 }).catch((e) => e);
  }
}
