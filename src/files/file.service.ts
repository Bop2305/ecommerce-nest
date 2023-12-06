
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { PublicFile } from './publicFile.entity';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(PublicFile)
        private publicFilesRepository: Repository<PublicFile>,
    ) { }

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();

        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.publicFilesRepository.save(newFile);
        return newFile;
    }

    async deletePublicFile(fileId: string) {
        const file = await this.publicFilesRepository.findOne({where: {id: fileId}})

        if(!file) throw new HttpException('File not found', HttpStatus.BAD_REQUEST)

        const s3 = new S3()
        await s3.deleteObject({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Key: fileId
        }).promise()

        const deletedFile = await this.publicFilesRepository.delete(fileId)

        if(deletedFile.affected) throw new HttpException('Delete file failed', HttpStatus.BAD_REQUEST)
    }
}