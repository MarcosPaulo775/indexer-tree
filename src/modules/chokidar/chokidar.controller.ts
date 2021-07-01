import { Controller, Get } from '@nestjs/common';

import { ChokidarService } from './chokidar.service';

@Controller('chokidar')
export class ChokidarController {
  constructor(private readonly chokidarService: ChokidarService) {}

  @Get('/')
  startChokidar() {
    this.chokidarService.startChokidar(false);
    return 'Start';
  }

  @Get('/test')
  test() {
    return this.chokidarService.printStatus();
  }
}
