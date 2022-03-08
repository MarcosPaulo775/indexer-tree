import { Injectable } from '@nestjs/common';
import { FSWatcher } from 'chokidar';

import { FileProducerService } from '@modules/file/jobs/file-producer.service';

import config from '../../config';

@Injectable()
export class ChokidarService {
  constructor(
    private chokidar: FSWatcher,
    private fileProducer: FileProducerService
  ) {}

  startChokidar() {
    this.chokidar = new FSWatcher({
      ignoreInitial: false,
      ignorePermissionErrors: true,
      usePolling: config.chokidar.usePolling,
      interval: config.chokidar.interval,
      binaryInterval: config.chokidar.binaryInterval,
    });

    this.chokidar.add(config.filesDirectory);
    this.chokidar.on('all', (event, url) => {
      this.actionsEvents(event, url);
    });

    return 'Indexer started!';
  }

  actionsEvents(
    event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir',
    url: string
  ) {
    if (event === 'add') {
      this.fileProducer.addFile(url).catch((e) => e);
    } else if (event === 'addDir') {
      this.fileProducer.addDir(url).catch((e) => e);
    } else if (event === 'unlink') {
      this.fileProducer.unlinkFile(url).catch((e) => e);
    } else if (event === 'unlinkDir') {
      this.fileProducer.unlinkDir(url).catch((e) => e);
    }
    return;
  }
}
