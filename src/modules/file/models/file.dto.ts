export class FileDto {
  constructor(
    name: string,
    path: string[],
    isDirectory: boolean,
    base64: string | null = null
  ) {
    this.name = name;
    this.path = path;
    this.isDirectory = isDirectory;
    this.base64 = base64;
  }

  name: string;
  path: string[];
  isDirectory: boolean;
  base64: string | null;
}
