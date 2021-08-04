import { Test, TestingModule } from '@nestjs/testing';

import config from '../../../config';
import { UrlService } from './url.service';

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

  it('extract url information', () => {
    if (config.removeFilename) {
      expect(urlService.extractUrlInformation('url/qualquer/file')).toEqual({
        name: 'file',
        path: ['url', 'qualquer'],
      });
    } else {
      expect(urlService.extractUrlInformation('url/qualquer/file')).toEqual({
        name: 'file',
        path: ['url', 'qualquer', 'file'],
      });
    }
  });
});
