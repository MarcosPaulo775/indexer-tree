/* istanbul ignore file */
import { Injectable } from '@nestjs/common';

import config from './config';

@Injectable()
export class AppService {
  constructor() {}

  checkApp(): boolean {
    return this.checkS3();
  }

  private checkS3(): boolean {
    const s3 = config.s3;

    if (!s3.region && !s3.bucket && !s3.accessKeyId && !s3.secretAccessKey) {
      return false;
    } else {
      let hasError = false;

      if (!s3.region) {
        hasError = true;
        console.log('Required S3_REGION environment!!');
      }

      if (!s3.bucket) {
        hasError = true;
        console.log('Required S3_BUCKET environment!!');
      }

      if (!s3.accessKeyId) {
        hasError = true;
        console.log('Required S3_ACCESS_KEY_ID environment!!');
      }

      if (!s3.secretAccessKey) {
        hasError = true;
        console.log('Required S3_SECRET_ACCESS_KEY environment!!');
      }

      return hasError;
    }
  }
}
