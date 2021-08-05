import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { FSWatcher } from 'chokidar';

import { FileProducerService } from '@modules/file/jobs/file-producer.service';

import config from '../../config';
import { ChokidarService } from './chokidar.service';

describe('ChokidarService', () => {
  let fsWatcher: FSWatcher;
  let chokidarService: ChokidarService;
  let fileProducer: FileProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BullModule.registerQueue({ name: config.bull.name })],
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
    expect(chokidarService.startChokidar(true)).toEqual('Indexer started!');
  });

  it('start chokidar ignore initial false', async () => {
    expect(chokidarService.startChokidar(false)).toEqual('Indexer started!');
  });
});
