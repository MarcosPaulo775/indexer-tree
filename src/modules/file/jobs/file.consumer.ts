import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

import { S3Service } from '@shared/services/s3/s3.service';
import { UrlService } from '@shared/services/url/url.service';

import config from '../../../config';
import { FileService } from '../file.service';
import { FileDto } from '../models/file.dto';

@Processor(config.bull.queue)
export class FileConsumer {
  constructor(
    private fileService: FileService,
    private urlService: UrlService,
    private s3Service: S3Service
  ) {}

  @Process('addFile')
  async addFile(job: Job<string>) {
    const url = job.data;
    if (url !== config.filesDirectory) {
      const { name, path } = this.urlService.extractUrlInformation(
        url,
        config.isDocker
      );
      const file = await this.fileService.isIndexed(name, path);
      if (!file) {
        const s3File = config.s3.bucket
          ? await this.s3Service.uploadFile(path, name)
          : undefined;

        await this.fileService.create(new FileDto(name, path, false, s3File));
        return `File ${path.join('/')} successfully added!`;
      }
      return `File ${path.join('/')} already exists!`;
    }
    return 'Project root ignored!';
  }

  @Process('addDir')
  async addDir(job: Job<string>) {
    const url = job.data;
    if (url !== config.filesDirectory) {
      const { name, path } = this.urlService.extractUrlInformation(
        url,
        config.isDocker
      );
      const file = await this.fileService.isIndexed(name, path);
      if (!file) {
        await this.fileService.create(new FileDto(name, path, true));
        return `Folder ${path.join('/')} successfully added!`;
      }
      return `Folder ${path.join('/')} already exists!`;
    }
    return 'Project root ignored!';
  }

  @Process('unlinkFile')
  async unlinkFile(job: Job<string>) {
    const url = job.data;
    const { name, path } = this.urlService.extractUrlInformation(
      url,
      config.isDocker
    );
    const file = await this.fileService.findOneByNameAndPathAndIsDirectory(
      name,
      path,
      false
    );
    if (file) {
      const resp = await this.fileService.delete(file._id);
      if (resp) {
        return `File ${path.join('/')} successfully deleted!`;
      }
      return `Error deleting file ${path.join('/')}!`;
    }
    return `File ${path.join('/')} not found!`;
  }

  @Process('unlinkDir')
  async unlinkDir(job: Job<string>) {
    const url = job.data;
    const { name, path } = this.urlService.extractUrlInformation(
      url,
      config.isDocker
    );
    const file = await this.fileService.findOneByNameAndPathAndIsDirectory(
      name,
      path,
      true
    );
    if (file) {
      const resp = await this.fileService.delete(file._id);
      if (resp) {
        return `Folder ${path.join('/')} successfully deleted!`;
      }
      return `Error deleting folder ${path.join('/')}!`;
    }
    return `Folder ${path.join('/')} not found!`;
  }
}
