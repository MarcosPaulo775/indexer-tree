import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';

import { FileService } from './file.service';
import { FileDto } from './models/file.dto';
import { File, FileDocument } from './models/file.schema';

describe('FileService', () => {
  let filesService: FileService;
  let fileModel: Model<File>;

  const fileCreate = new FileDto(
    'fileName',
    ['folder', 'folder2', 'fileName'],
    false
  );

  const file = {
    _id: Types.ObjectId(),
    name: 'fileName',
    path: ['folder', 'folder2', 'fileName'],
    isDirectory: false,
  } as FileDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getModelToken('File'),
          useValue: Model,
        },
      ],
    }).compile();

    filesService = module.get<FileService>(FileService);
    fileModel = module.get<Model<File>>(getModelToken('File'));
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
    expect(fileModel).toBeDefined();
  });

  it('create file', async () => {
    jest.spyOn(fileModel, 'create').mockImplementation(async () => file);
    expect(await filesService.create(fileCreate)).toEqual(file);
  });

  it('update file sucess', async () => {
    fileModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(file) });
    fileModel.updateOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ ok: 1 }) });
    expect(await filesService.update('id', fileCreate)).toEqual(
      'File updated successfully!'
    );
  });

  it('update file error', async () => {
    fileModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(file) });
    fileModel.updateOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ ok: 0 }) });
    expect(await filesService.update('id', fileCreate)).toEqual(
      'Error updating file!'
    );
  });

  it('update file unexists', async () => {
    fileModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    expect(await filesService.update('id', fileCreate)).toEqual(
      'File not found!'
    );
  });

  it('delete file sucess', async () => {
    fileModel.deleteOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ ok: 1 }) });
    expect(await filesService.delete('id')).toBeTruthy();
  });

  it('delete file error', async () => {
    fileModel.deleteOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ ok: 0 }) });
    expect(await filesService.delete('id')).toBeFalsy();
  });

  it('find one by name and path and isDirectory sucess', async () => {
    fileModel.findOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(file) });
    expect(
      await filesService.findOneByNameAndPathAndIsDirectory(
        'fileName',
        ['path', 'fileName'],
        true
      )
    ).toEqual(file);
  });

  it('find one by name and path and isDirectory error', async () => {
    fileModel.findOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    expect(
      await filesService.findOneByNameAndPathAndIsDirectory(
        'fileName',
        ['path', 'fileName'],
        false
      )
    ).toEqual(null);
  });

  it('is indexed true', async () => {
    fileModel.findOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(file) });
    expect(
      await filesService.isIndexed('fileName', ['path', 'fileName'])
    ).toBeTruthy();
  });

  it('is indexed false', async () => {
    fileModel.findOne = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    expect(
      await filesService.isIndexed('fileName', ['path', 'fileName'])
    ).toBeFalsy();
  });
});
