import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrivateFileService {
  constructor(private readonly configService: ConfigService) {}

  async getPrivateSignedUrlFromUrl(fileUrl: string) {
    if (!fileUrl) {
      throw new HttpException('File URL is required', HttpStatus.BAD_REQUEST);
    }

    const urlParts = new URL(fileUrl);
    const key = urlParts.pathname.substring(1); // Remove the leading '/'

    if (!key) {
      throw new HttpException('Invalid S3 URL format', HttpStatus.BAD_REQUEST);
    }

    return this.getPrivateFileSignedUrl(key);
  }

  async getPrivateFileSignedUrl(key: string, bucketName?: string) {
    const s3 = this.getS3();
    const fileUrl = s3.getSignedUrlPromise('getObject', {
      Bucket: bucketName || this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key,
      Expires: 3600,
    });
    if (!fileUrl)
      throw new NotFoundException({
        message: `No file found with the given key ${key}`,
      });
    return fileUrl;
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      signatureVersion: 'v4',
      region: this.configService.get('AWS_REGION'),
    });
  }

  getFileProperties(base64String: string | Buffer) {
    // Convert Buffer to string if necessary
    const base64Str = Buffer.isBuffer(base64String)
      ? base64String.toString('utf-8')
      : base64String;

    const fileBuffer = Buffer.from(
      base64Str.replace(/^data:.+;base64,/, ''),
      'base64',
    );
    // Extract MIME type (if present)
    const match = base64Str.match(/^data:(.+);base64,/);
    const mimeType = match ? match[1] : null;

    // Infer file extension
    const fileType = mimeType ? mimeType.split('/')[1] : null;

    return {
      fileType,
      mimeType,
      fileBuffer,
    };
  }

  async uploadTechnicianFile(
    fileName: string,
    base64File: Buffer | string,
    bucketName?: string,
  ) {
    const { mimeType, fileBuffer } = this.getFileProperties(base64File);
    const s3 = new S3();
    const uploadedFile = await s3
      .upload({
        Bucket: bucketName || this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimeType,
      })
      .promise();
    return uploadedFile?.Location;
  }
}
