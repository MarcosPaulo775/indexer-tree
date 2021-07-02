import { Test, TestingModule } from '@nestjs/testing';

import { UrlService } from './url.service';
import config from 'src/config';

describe('UrlService', () => {
  let urlService: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  it('extract file information dev', () => {
    expect(urlService.extractFileInformation('url/qualquer/file')).toEqual({
      name: 'files',
      path: ['url', 'qualquer', 'file'],
    });
  });
});
