import { Injectable } from '@nestjs/common';
import { FSWatcher } from 'chokidar';

import { FileService } from '@modules/file/file.service';

import { UrlService } from '@shared/services/url/url.service';

@Injectable()
export class ChokidarService {
  constructor(
    private readonly fileService: FileService,
    private readonly urlService: UrlService,
    private chokidar: FSWatcher
  ) {}

  async startChokidar(ignoreInitial: boolean) {
    this.chokidar = new FSWatcher({
      persistent: true,
      ignored: '*.db',
      awaitWriteFinish: true,
      ignoreInitial,
    });

    try {
      this.chokidar.add('../files');

      // Add event listeners.
      this.chokidar
        .on('all', (event, url) => {
          console.log(url);
          const { name, path } = this.urlService.extractFileInformation(url);
          if (name !== 'files') {
            // const file = await this.fileService.isIndexed(name, path);
            //if (!file) {
            //  console.log(name)
            //  // await this.fileService.create(name, path, false);
            //}
          }
        })
        .on('ready', () => {
          console.log('read');
        })
        .on('error', (erro) => {
          console.log(erro);
        })
        .on('raw', (event, path) => {
          console.log(path);
        });
    } catch (e) {
      return JSON.stringify(e);
    }

    return 'Indexador inicializado com sucesso !';
  }

  printStatus() {
    return String(JSON.stringify(this.chokidar));
  }

  // async stopChokidar() {
  //   return await this.chokidar
  //     .close()
  //     .then(() => 'Indexador parado com sucesso !')
  //     .catch((e) => JSON.stringify(e));
  // }
}
