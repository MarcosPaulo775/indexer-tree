import { Injectable } from '@nestjs/common';

import config from '../../../config';

@Injectable()
export class UrlService {
  extractUrlInformation(url: string) {
    url = url.replace(config.filesDirectory, '');
    const aux = url.split('/');
    const name = aux[aux.length - 1];
    const path = [];

    for (const value of aux) {
      path.push(value);
    }

    if (config.removeFilename) {
      path.pop();
    }

    return { name, path };
  }
}
