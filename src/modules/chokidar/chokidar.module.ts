import { Module } from '@nestjs/common';
import { FSWatcher } from 'chokidar';

import { FileModule } from '@modules/file/file.module';

import { ChokidarService } from './chokidar.service';

@Module({
  imports: [FileModule],
  providers: [ChokidarService, FSWatcher],
})
export class ChokidarModule {}
