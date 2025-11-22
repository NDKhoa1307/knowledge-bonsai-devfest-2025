import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class GcpBucketService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID || 'devfest2025-knowledge-bonsai',
    });

    this.bucketName = process.env.GCP_BUCKET_NAME || 'knowledge-bonsai';
  }

  async uploadObject(
    destinationPath: string,
    fileBuffer: Buffer,
    contentType?: string,
  ): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(destinationPath);

    await file.save(fileBuffer, {
      metadata: { contentType },
      public: false, // set true if you want public access
    });

    return `gs://${this.bucketName}/${destinationPath}`;
  }

  async getObject(objectPath: string): Promise<Buffer> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(objectPath);

    const [data] = await file.download();
    return data;
  }

  parseGcsUrl = (url: string) => {
    const [bucketName, ...rest] = url.replace('gs://', '').split('/');
    return { bucketName, objectKey: rest.join('/') };
  };

  checkExistence = async (objectPath: string): Promise<boolean> => {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(objectPath);
    const [exists] = await file.exists();
    return exists;
  };
}
