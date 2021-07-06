import { Injectable } from '@nestjs/common';
import { FSWatcher } from 'chokidar';
import { Stats } from 'fs';

import { FileService } from '@modules/file/file.service';
import { FileDto } from '@modules/file/models/file.dto';

import { UrlService } from '@shared/services/url/url.service';

import config from '../../config';

@Injectable()
export class ChokidarService {
  constructor(
    private readonly fileService: FileService,
    private readonly urlService: UrlService,
    private chokidar: FSWatcher
  ) {}

  startChokidar(ignoreInitial: boolean) {
    this.chokidar = new FSWatcher({
      persistent: true,
      ignored: '*.db',
      awaitWriteFinish: true,
      ignoreInitial,
    });

    this.chokidar.add(config.filesDirectory);
    this.chokidar.on('all', this.actionsEvents);

    return 'Indexador iniciado com sucesso!';
  }

  actionsEvents(event: 'add' | 'addDir' | 'unlink' | 'unlinkDir', url: string) {
    if (event === 'add') {
      this.addEvent(url);
    } else if (event === 'addDir') {
      this.addDirEvent(url);
    } else if (event === 'unlink') {
      this.unlinkEvent(url);
    } else {
      this.unlinkDirEvent(url);
    }
  }

  async addEvent(url: string): Promise<string> {
    if (url !== config.filesDirectory) {
      const { name, path } = this.urlService.extractUrlInformation(url);
      const file = await this.fileService.isIndexed(name, path);
      if (!file) {
        await this.fileService.create(new FileDto(name, path, false));
        return `Arquivo ${path.join('/')} adicionado com sucesso!`;
      }
      return `Arquivo ${path.join('/')} já existe!`;
    }
    return 'Raiz do projeto ignorada!';
  }

  async addDirEvent(url: string): Promise<string> {
    if (url !== config.filesDirectory) {
      const { name, path } = this.urlService.extractUrlInformation(url);
      const file = await this.fileService.isIndexed(name, path);
      if (!file) {
        await this.fileService.create(new FileDto(name, path, true));
        return `Pasta ${path.join('/')} adicionado com sucesso!`;
      }
      return `Pasta ${path.join('/')} já existe!`;
    }
    return 'Raiz do projeto ignorada!';
  }

  async unlinkEvent(url: string): Promise<string> {
    const { name, path } = this.urlService.extractUrlInformation(url);
    const file = await this.fileService.findOneByNameAndPathAndIsDirectory(
      name,
      path,
      false
    );
    if (file) {
      const resp = await this.fileService.delete(file._id);
      if (resp) {
        return `Arquivo ${path.join('/')} deletado com sucesso!`;
      }
      return `Erro ao deletar arquivo ${path.join('/')}!`;
    }
    return `Arquivo ${path.join('/')} inexistente!`;
  }

  async unlinkDirEvent(url: string): Promise<string> {
    const { name, path } = this.urlService.extractUrlInformation(url);
    const file = await this.fileService.findOneByNameAndPathAndIsDirectory(
      name,
      path,
      true
    );
    if (file) {
      const resp = await this.fileService.delete(file._id);
      if (resp) {
        return `Pasta ${path.join('/')} deletada com sucesso!`;
      }
      return `Erro ao deletar pasta ${path.join('/')}!`;
    }
    return `Pasta ${path.join('/')} inexistente!`;
  }
}
