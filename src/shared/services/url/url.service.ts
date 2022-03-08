import { Injectable } from '@nestjs/common';

import config from '../../../config';

@Injectable()
export class UrlService {
  extractUrlInformation(url: string, isDocker: boolean) {
    if (isDocker) {
      url = url.replace(config.filesDirectory, '');
    }

    const aux = url.split('/');
    const name = aux[aux.length - 1];
    const path = [];

    for (const value of aux) {
      path.push(value);
    }

    // Remove file name
    path.pop();

    return { name, path };
  }

  generateRootPath(path: string[], name: string, isDocker: boolean) {
    const rootPath = [];

    if (isDocker) {
      rootPath.push(config.filesDirectory);
    }

    rootPath.push(...path, name);

    return rootPath.join('/').replace('//', '/');
  }

  generateKey(path: string[], name: string, keyPrefix?: string) {
    const key = keyPrefix ? [...keyPrefix.split('/')] : [];

    key.push(...path, name);

    return key.join('/').replace('//', '/');
  }
}
