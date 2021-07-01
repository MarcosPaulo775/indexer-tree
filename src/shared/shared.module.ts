import { Module } from '@nestjs/common';

import { UrlService } from './services/url/url.service';

@Module({
  providers: [UrlService],
  exports: [UrlService],
})
export class SharedModule {}
