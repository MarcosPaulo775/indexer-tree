export class FileDto {
  constructor(name: string, path: string[], isDirectory: boolean, s3?: S3) {
    this.name = name;
    this.path = path;
    this.isDirectory = isDirectory;

    this.s3 = s3;
  }

  name: string;
  path: string[];
  isDirectory: boolean;

  s3?: S3;
}

export class S3 {
  constructor(ETag: string, Location: string, Key: string, Bucket: string) {
    this.ETag = ETag;
    this.Location = Location;
    this.Key = Key;
    this.Bucket = Bucket;
  }

  ETag: string;
  Location: string;
  Key: string;
  Bucket: string;
}
