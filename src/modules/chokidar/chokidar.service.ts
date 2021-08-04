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

  startChokidar(ignoreInitial: boolean) {
    this.chokidar = new FSWatcher({
      persistent: true,
      usePolling: true,
      interval: 200,
      binaryInterval: 600,
      ignorePermissionErrors: false,
      ignoreInitial,
    });

    this.chokidar.add(config.filesDirectory);
    this.chokidar.on('all', (event, url) => {
      this.actionsEvents(event, url);
    });

    return 'Indexador iniciado com sucesso!';
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
