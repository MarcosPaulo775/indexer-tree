import { BullModule } from '@nestjs/bull';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { Model } from 'mongoose';

import { UrlService } from '@shared/services/url/url.service';

import config from '../../../config';
import { FileService } from '../file.service';
import { FileDocument } from '../models/file.schema';
import { FileConsumer } from './file.consumer';

describe('FileConsumer', () => {
  let urlService: UrlService;
  let fileService: FileService;
  let fileConsumer: FileConsumer;

  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'fileIndexer',
          limiter: {
            max: 100,
            duration: 60000,
          },
        }),
      ],
      providers: [
        FileConsumer,
        UrlService,
        FileService,
        {
          provide: getModelToken('File'),
          useValue: Model,
        },
      ],
    }).compile();

    fileService = module.get<FileService>(FileService);
    fileConsumer = module.get<FileConsumer>(FileConsumer);
    urlService = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(fileService).toBeDefined();
    expect(fileConsumer).toBeDefined();
    expect(urlService).toBeDefined();
  });

  it('add file consumer file is root', async () => {
    expect(
      await fileConsumer.addFile({ data: config.filesDirectory } as Job<string>)
    ).toEqual('Raiz do projeto ignorada!');
  });

  it('add file consumer exist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(true);
    expect(
      await fileConsumer.addFile({ data: 'path/file.txt' } as Job<string>)
    ).toEqual('Arquivo path/file.txt já existe!');
  });

  it('add file consumer unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(false);
    jest.spyOn(fileService, 'create').mockResolvedValue({} as FileDocument);
    expect(
      await fileConsumer.addFile({ data: 'path/file.txt' } as Job<string>)
    ).toEqual('Arquivo path/file.txt adicionado com sucesso!');
  });

  it('add dir consumer folder is root', async () => {
    expect(
      await fileConsumer.addDir({
        data: config.filesDirectory,
      } as Job<string>)
    ).toEqual('Raiz do projeto ignorada!');
  });

  it('add dir consumer folder exist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(true);
    expect(
      await fileConsumer.addDir({ data: 'path/folder' } as Job<string>)
    ).toEqual('Pasta path/folder já existe!');
  });

  it('add dir consumer folder unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest.spyOn(fileService, 'isIndexed').mockResolvedValue(false);
    jest.spyOn(fileService, 'create').mockResolvedValue({} as FileDocument);
    expect(
      await fileConsumer.addDir({ data: 'path/folder' } as Job<string>)
    ).toEqual('Pasta path/folder adicionado com sucesso!');
  });

  it('unlink file consumer exist delete sucess', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(true);
    expect(
      await fileConsumer.unlinkFile({ data: 'path/file.txt' } as Job<string>)
    ).toEqual('Arquivo path/file.txt deletado com sucesso!');
  });

  it('unlink file consumer exist delete fail', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(false);
    expect(
      await fileConsumer.unlinkFile({ data: 'path/file.txt' } as Job<string>)
    ).toEqual('Erro ao deletar arquivo path/file.txt!');
  });
  it('unlink file consumer unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'file.txt', path: ['path', 'file.txt'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue(null);
    expect(
      await fileConsumer.unlinkFile({ data: 'path/file.txt' } as Job<string>)
    ).toEqual('Arquivo path/file.txt inexistente!');
  });

  it('unlink dir consumer folder exist delete sucess', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(true);
    expect(
      await fileConsumer.unlinkDir({ data: 'path/folder' } as Job<string>)
    ).toEqual('Pasta path/folder deletada com sucesso!');
  });

  it('unlink dir consumer folder exist delete fail', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue({} as FileDocument);
    jest.spyOn(fileService, 'delete').mockResolvedValue(false);
    expect(
      await fileConsumer.unlinkDir({ data: 'path/folder' } as Job<string>)
    ).toEqual('Erro ao deletar pasta path/folder!');
  });
  it('unlink dir consumer folder unexist', async () => {
    jest
      .spyOn(urlService, 'extractUrlInformation')
      .mockReturnValue({ name: 'folder', path: ['path', 'folder'] });
    jest
      .spyOn(fileService, 'findOneByNameAndPathAndIsDirectory')
      .mockResolvedValue(null);
    expect(
      await fileConsumer.unlinkDir({ data: 'path/folder' } as Job<string>)
    ).toEqual('Pasta path/folder inexistente!');
  });
});
