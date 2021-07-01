import { File } from '@file/models/file.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  extractFileInformation(url: string): File {
    const aux = url.split('/');
    const name = aux[aux.length - 1];
    const path = [];

    for (const end of aux) {
      if (end !== 'files') {
        path.push(end);
      }
    }

    return {
      name,
      path,
      isDirectory: name === 'files',
    } as File;
  }
}
