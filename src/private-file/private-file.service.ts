import { Injectable } from '@nestjs/common';
import PrivateFile from './entities/private-file-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrivateFileService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFileService: Repository<PrivateFile>,
    private readonly configService: ConfigService,
  ) {}
  async uploadPrivateFile(
    userId: string,
    fileName: string,
    fileType: string,
    fileBuffer: Buffer,
  ) {
    const s3 = new S3();
    const uploadedFile = await s3
      .upload({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Body: fileBuffer,
        Key: fileName,
        ContentType: fileType,
      })
      .promise();

    const newPrivateFile = this.privateFileService.create({
      key: uploadedFile.Key,
      owner: {
        id: userId,
      },
    });
    await this.privateFileService.save(newPrivateFile);
    return newPrivateFile;
  }
  async getPrivateFileSignedUrl(key: string) {
    const s3 = this.getS3();
    const res = s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key,
      Expires: 3600,
    });
    return res;
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
