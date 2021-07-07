import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { FSWatcher } from 'chokidar';

import { FileProducerService } from '@modules/file/jobs/file-producer.service';

import { ChokidarService } from './chokidar.service';

describe('ChokidarService', () => {
  let fsWatcher: FSWatcher;
  let chokidarService: ChokidarService;
  let fileProducer: FileProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BullModule.registerQueue({ name: 'fileIndexer' })],
      providers: [ChokidarService, FSWatcher, FileProducerService],
    }).compile();

    fsWatcher = module.get<FSWatcher>(FSWatcher);
    chokidarService = module.get<ChokidarService>(ChokidarService);
    fileProducer = module.get<FileProducerService>(FileProducerService);
  });

  it('should be defined', () => {
    expect(fsWatcher).toBeDefined();
    expect(chokidarService).toBeDefined();
    expect(fileProducer).toBeDefined();
  });

  it('actions events add', () => {
    jest.spyOn(fileProducer, 'addFile').mockResolvedValue();
    expect(chokidarService.actionsEvents('add', 'path/url')).toBe(undefined);
  });

  it('actions events add error', () => {
    jest.spyOn(fileProducer, 'addFile').mockRejectedValue({ catch: Error() });
    expect(chokidarService.actionsEvents('add', 'path/url')).toBe(undefined);
  });

  it('actions events addDir', () => {
    jest.spyOn(fileProducer, 'addDir').mockResolvedValue();
    expect(chokidarService.actionsEvents('addDir', 'path/url')).toBe(undefined);
  });

  it('actions events addDir error', () => {
    jest.spyOn(fileProducer, 'addDir').mockRejectedValue({ catch: Error() });
    expect(chokidarService.actionsEvents('addDir', 'path/url')).toBe(undefined);
  });

  it('actions events unlink', () => {
    jest.spyOn(fileProducer, 'unlinkFile').mockResolvedValue();
    expect(chokidarService.actionsEvents('unlink', 'path/url')).toBe(undefined);
  });

  it('actions events unlink error', () => {
    jest
      .spyOn(fileProducer, 'unlinkFile')
      .mockRejectedValue({ catch: Error() });
    expect(chokidarService.actionsEvents('unlink', 'path/url')).toBe(undefined);
  });

  it('actions events unlinkDir', () => {
    jest.spyOn(fileProducer, 'unlinkDir').mockResolvedValue();
    expect(chokidarService.actionsEvents('unlinkDir', 'path/url')).toBe(
      undefined
    );
  });

  it('actions events unlinkDir error', () => {
    jest.spyOn(fileProducer, 'unlinkDir').mockRejectedValue({ catch: Error() });
    expect(chokidarService.actionsEvents('unlinkDir', 'path/url')).toBe(
      undefined
    );
  });

  it('actions events change', () => {
    expect(chokidarService.actionsEvents('change', 'path/url')).toBe(undefined);
  });

  it('start chokidar ignore initial true', () => {
    expect(chokidarService.startChokidar(true)).toEqual(
      'Indexador iniciado com sucesso!'
    );
  });

  it('start chokidar ignore initial false', async () => {
    expect(chokidarService.startChokidar(false)).toEqual(
      'Indexador iniciado com sucesso!'
    );
  });

  /*
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
  */
});
