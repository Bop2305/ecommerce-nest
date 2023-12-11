import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BufferedFile } from './file.model';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
    private readonly bucketName = process.env.MINIO_BUCKET_NAME

    constructor(private readonly minio: MinioService) { }

    public get client() {
        return this.minio.client
    }

    async upload(file: BufferedFile, bucketName: string = this.bucketName) {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
            throw new HttpException(
                'File type not supported',
                HttpStatus.BAD_REQUEST,
            );
        }

        const timestamp = Date.now().toString()

        const hashedFileName = crypto
            .createHash('md5')
            .update(timestamp)
            .digest('hex');

        const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
        );

        const metaData = {
            'Content-Type': file.mimetype,
        };
        
        const fileName = hashedFileName + extension

        await this.client.putObject(
            bucketName,
            fileName,
            file.buffer,
            metaData,
        )

        return {
            key: hashedFileName,
            url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`,
        };
    }
}
