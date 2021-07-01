import { Test, TestingModule } from '@nestjs/testing';

import { ChokidarService } from './chokidar.service';

describe('ChokidarService', () => {
  let service: ChokidarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChokidarService],
    }).compile();

    service = module.get<ChokidarService>(ChokidarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
