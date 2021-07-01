import { Module } from '@nestjs/common';
import { FSWatcher } from 'chokidar';

import { FileModule } from '@modules/file/file.module';

import { SharedModule } from '@shared/shared.module';

import { ChokidarController } from './chokidar.controller';
import { ChokidarService } from './chokidar.service';

@Module({
  imports: [FileModule, SharedModule],
  providers: [ChokidarService, FSWatcher],
  controllers: [ChokidarController],
})
export class ChokidarModule {}
