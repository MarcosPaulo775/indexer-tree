import { Injectable } from '@nestjs/common';
import { FSWatcher } from 'chokidar';

import { FileService } from '@modules/file/file.service';
import { FileDto } from '@modules/file/models/file.dto';

import { UrlService } from '@shared/services/url/url.service';

import config from 'src/config';

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
      // followSymlinks: false,
      awaitWriteFinish: true,
      ignoreInitial,
    });

    try {
      this.chokidar.add(config?.filesDirectory);

      this.chokidar
        .on('add', async (url) => {
          if (url !== config?.filesDirectory) {
            const { name, path } = this.urlService.extractFileInformation(url);
            const file = await this.fileService.isIndexed(name, path);
            if (!file) {
              await this.fileService.create(new FileDto(name, path, false));
            }
          }
        })
        .on('addDir', async (url) => {
          if (url !== config?.filesDirectory) {
            const { name, path } = this.urlService.extractFileInformation(url);
            const file = await this.fileService.isIndexed(name, path);
            if (!file) {
              await this.fileService.create(new FileDto(name, path, true));
            }
          }
        })
        .on('ready', () => {
          console.log('read');
        })
        .on('error', (erro) => {
          console.log(`ERROR: ${erro}`);
        })
        .on('all', (event, path) => {
          console.log('');
          console.log('ALL:');
          console.log(event, path);
        })
        .on('raw', (event, path, details) => {
          console.log('');
          console.log('RAW:');
          console.log(event, path, details);
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
