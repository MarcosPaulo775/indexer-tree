import { Test, TestingModule } from '@nestjs/testing';

import { ChokidarController } from './chokidar.controller';

describe('ChokidarController', () => {
  let controller: ChokidarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChokidarController],
    }).compile();

    controller = module.get<ChokidarController>(ChokidarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
