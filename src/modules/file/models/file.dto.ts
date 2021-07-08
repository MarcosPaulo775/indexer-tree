export class FileDto {
  constructor(name: string, path: string[], isDirectory: boolean) {
    this.name = name;
    this.path = path;
    this.isDirectory = isDirectory;
  }

  name: string;
  path: string[];
  isDirectory: boolean;
}
