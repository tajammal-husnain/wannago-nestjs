import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Files from './entities/public-file-entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private publicFilesRepository: Repository<Files>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(
    filename: string,
    fileType: string,
    dataBuffer: Buffer,
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: filename,
        ContentType: fileType,
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async removeFileFromAWS(fileId: string) {
    try {
      const file = await this.publicFilesRepository.findOneBy({ id: fileId });
      await this.publicFilesRepository.delete(file);
      const removedAWSFile = await this.removeFile(file?.url);
      console.log(
        `🤖 ~ file: files.service.ts:43 ~ FilesService ~ removeFileFromAWS ~ removedAWSFile:`,
        removedAWSFile,
      );
    } catch (error) {
      console.log(
        `🤖 ~ file: files.service.ts:50 ~ FilesService ~ removeFileFromAWS ~ error:`,
        error,
      );
      return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  getUrl(file: string) {
    const key = file?.split('/').at(-1);
    const bucketS3 = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    return this.getSignedUrl(key, bucketS3);
  }

  getSignedUrl(key, bucket) {
    const s3 = this.getS3();
    return s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: key,
      Expires: 3600,
    });
  }
  async removeFile(filePath: string) {
    const key = filePath?.split('/').at(-1);
    const bucketS3 = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
    const s3 = this.getS3();
    return s3.deleteObject({
      Bucket: bucketS3,
      Key: key,
    });
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      signatureVersion: 'v4',
      region: this.configService.get('AWS_REGION'),
    });
  }
}
