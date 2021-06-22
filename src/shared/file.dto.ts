export class FileDTO {
  constructor(path: string, isFolder = false) {
    this.path = path;
    this.isFolder = isFolder;
  }

  path: string;
  isFolder: boolean;
  //base64: string;
}