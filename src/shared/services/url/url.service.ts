import { Injectable } from '@nestjs/common';

import config from 'src/config';

@Injectable()
export class UrlService {
  extractFileInformation(url: string) {
    url = url.replace(config?.filesDirectory, '');
    const aux = url.split('/');
    const name = aux[aux.length - 1];
    const path = [];

    for (const value of aux) {
      path.push(value);
    }

    return { name, path };
  }
}
