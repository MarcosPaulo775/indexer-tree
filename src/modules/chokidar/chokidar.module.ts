import { Module } from '@nestjs/common';
import { FSWatcher } from 'chokidar';

import { FileModule } from '@file/file.module';
import { SharedModule } from '@shared/shared.module';

import { ChokidarService } from './chokidar.service';
import { ChokidarController } from './chokidar.controller';

@Module({
  imports: [
    FileModule,
    SharedModule
  ],
  providers: [ChokidarService,FSWatcher],
  controllers: [ChokidarController],
})
export class ChokidarModule { }
