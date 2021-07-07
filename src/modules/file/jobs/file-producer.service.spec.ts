import { Test, TestingModule } from '@nestjs/testing';
import { FileProducerService } from './file-producer.service';

describe('FileProducerService', () => {
  let service: FileProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileProducerService],
    }).compile();

    service = module.get<FileProducerService>(FileProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
