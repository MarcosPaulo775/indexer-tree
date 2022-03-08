/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { createReadStream } from 'fs';

import { S3 } from '@modules/file/models/file.dto';

import config from '../../../config';
import { UrlService } from '../url/url.service';

@Injectable()
export class S3Service {
  s3: AWS.S3;

  constructor(private urlService: UrlService) {
    AWS.config.update({
      region: config.s3.region,
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey,
    });
    this.s3 = new AWS.S3({ apiVersion: config.s3.apiVersion });
  }

  uploadFile(path: string[], name: string): Promise<S3> {
    return new Promise((resolve, reject) => {
      const file = this.urlService.generateRootPath(
        path,
        name,
        config.isDocker
      );

      const fileStream = createReadStream(file);
      const uploadParams = {
        Bucket: config.s3.bucket,
        Key: this.urlService.generateKey(path, name, config.s3.prefixKey),
        Body: fileStream,
      };

      this.s3.upload(uploadParams, (err: Error, data: S3) => {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({
            ETag: data.ETag,
            Location: data.Location,
            Key: data.Key,
            Bucket: data.Bucket,
          } as S3);
        }
      });
    });
  }
}
