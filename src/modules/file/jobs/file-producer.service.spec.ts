import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { Queue } from 'bull';

import config from '../../../config';
import { FileProducerService } from './file-producer.service';

describe('FileProducerService', () => {
  let fileProducerService: FileProducerService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: config.bull.queue,
          limiter: {
            max: config.bull.max,
            duration: 1000,
          },
        }),
      ],
      providers: [FileProducerService],
    }).compile();

    fileProducerService = module.get<FileProducerService>(FileProducerService);
  });

  it('should be defined', () => {
    expect(fileProducerService).toBeDefined();
  });

  it('add file', async () => {
    const queue: Queue = module.get<Queue>(getQueueToken(config.bull.queue));
    jest.spyOn(queue, 'add').mockRejectedValue({ catch: Error() });
    expect(await fileProducerService.addFile('path/file')).toBe(undefined);
  });

  it('add dir', async () => {
    const queue: Queue = module.get<Queue>(getQueueToken(config.bull.queue));
    jest.spyOn(queue, 'add').mockRejectedValue({ catch: Error() });
    expect(await fileProducerService.addDir('path/folder')).toBe(undefined);
  });

  it('unlink file', async () => {
    const queue: Queue = module.get<Queue>(getQueueToken(config.bull.queue));
    jest.spyOn(queue, 'add').mockRejectedValue({ catch: Error() });
    expect(await fileProducerService.unlinkFile('path/file')).toBe(undefined);
  });

  it('unlink dir', async () => {
    const queue: Queue = module.get<Queue>(getQueueToken(config.bull.queue));
    jest.spyOn(queue, 'add').mockRejectedValue({ catch: Error() });
    expect(await fileProducerService.unlinkDir('path/folder')).toBe(undefined);
  });
});
