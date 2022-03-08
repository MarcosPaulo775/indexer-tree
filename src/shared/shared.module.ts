import { Module } from '@nestjs/common';

import { S3Service } from './services/s3/s3.service';
import { UrlService } from './services/url/url.service';

@Module({
  providers: [S3Service, UrlService],
  exports: [S3Service, UrlService],
})
export class SharedModule {}
