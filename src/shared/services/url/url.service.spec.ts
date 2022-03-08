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

  describe('extract url information', () => {
    it('isDocker=true', () => {
      expect(urlService.extractUrlInformation('./url/any/file', true)).toEqual({
        name: 'file',
        path: ['url', 'any'],
      });
    });

    it('isDocker=false', () => {
      expect(urlService.extractUrlInformation('url/any/file', false)).toEqual({
        name: 'file',
        path: ['url', 'any'],
      });
    });
  });

  describe('generateRootPath', () => {
    it('isDocker=true', () => {
      expect(urlService.generateRootPath(['url', 'any'], 'file', true)).toEqual(
        (config.filesDirectory + '/url/any/file').replace('//', '/')
      );
    });

    it('isDocker=false', () => {
      expect(
        urlService.generateRootPath(['url', 'any'], 'file', false)
      ).toEqual('url/any/file');
    });
  });

  describe('generateKey', () => {
    it('prefix ends with /', () => {
      expect(
        urlService.generateKey(['url', 'any'], 'file', 'abc/abc/')
      ).toEqual('abc/abc/' + 'url/any/file');
    });

    it('prefix no ends with /', () => {
      expect(urlService.generateKey(['url', 'any'], 'file', 'abc/abc')).toEqual(
        'abc/abc/' + 'url/any/file'
      );
    });

    it('without prefix', () => {
      expect(urlService.generateKey(['url', 'any'], 'file')).toEqual(
        'url/any/file'
      );
    });
  });
});
