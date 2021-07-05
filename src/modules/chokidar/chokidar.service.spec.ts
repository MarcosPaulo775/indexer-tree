import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FSWatcher } from 'chokidar';
import { Model } from 'mongoose';

import { FileService } from '@modules/file/file.service';
import { FileDocument } from '@modules/file/models/file.schema';

import { UrlService } from '@shared/services/url/url.service';

import config from '../../config';
import { ChokidarService } from './chokidar.service';

describe('ChokidarService', () => {
  let chokidarService: ChokidarService;
  let fsWatcher: FSWatcher;

  let fileService: FileService;
  let urlService: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ChokidarService,
        FSWatcher,
        FileService,
        UrlService,
        {
          provide: getModelToken('File'),
          useValue: Model,
        },
      ],
    }).compile();

    chokidarService = module.get<ChokidarService>(ChokidarService);
    fsWatcher = module.get<FSWatcher>(FSWatcher);
    fileService = module.get<FileService>(FileService);
    urlService = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(chokidarService).toBeDefined();
    expect(fsWatcher).toBeDefined();
    expect(fileService).toBeDefined();
    expect(urlService).toBeDefined();
  });

  it('event add root', async () => {
    expect(await chokidarService.addEvent(config.filesDirectory)).toEqual(
      'Raiz do projeto ignorada!'
    );
  });

  it('event add file exist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(true);
    expect(await chokidarService.addEvent('path/file.txt')).toEqual(
      'Arquivo path/file.txt já existe!'
    );
  });

  it('event add file unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(false);
    jest.spyOn(fileService, 'create').mockResolvedValue({} as FileDocument);
    expect(await chokidarService.addEvent('path/file.txt')).toEqual(
      'Arquivo path/file.txt adicionado com sucesso!'
    );
  });

  it('event addDir root', async () => {
    expect(await chokidarService.addDirEvent(config.filesDirectory)).toEqual(
      'Raiz do projeto ignorada!'
    );
  });

  it('event addDir file exist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(true);
    expect(await chokidarService.addDirEvent('path/file.txt')).toEqual(
      'Pasta path/file.txt já existe!'
    );
  });

  it('event addDir file unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(false);
    jest.spyOn(fileService, 'create').mockResolvedValue({} as FileDocument);
    expect(await chokidarService.addDirEvent('path/file.txt')).toEqual(
      'Pasta path/file.txt adicionado com sucesso!'
    );
  });

  it('event unlink file exist delete sucess', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(true);
    expect(await chokidarService.unlinkEvent('path/file.txt')).toEqual(
      'Arquivo path/file.txt deletado com sucesso!'
    );
  });

  it('event unlink file exist delete fail', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(false);
    expect(await chokidarService.unlinkEvent('path/file.txt')).toEqual(
      'Erro ao deletar arquivo path/file.txt!'
    );
  });
  it('event unlink file unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue(null);
    expect(await chokidarService.unlinkEvent('path/file.txt')).toEqual(
      'Arquivo path/file.txt inexistente!'
    );
  });

  it('event unlinkDirEvent folder exist delete sucess', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(true);
    expect(await chokidarService.unlinkDirEvent('path/folder')).toEqual(
      'Pasta path/folder deletada com sucesso!'
    );
  });

  it('event unlinkDirEvent folder exist delete fail', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(false);
    expect(await chokidarService.unlinkDirEvent('path/folder')).toEqual(
      'Erro ao deletar pasta path/folder!'
    );
  });
  it('event unlinkDirEvent folder unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue(null);
    expect(await chokidarService.unlinkDirEvent('path/folder')).toEqual(
      'Pasta path/folder inexistente!'
    );
  });
});
