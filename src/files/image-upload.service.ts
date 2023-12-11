import { Injectable } from "@nestjs/common";
import { OKSuccessResponse } from "src/core/success.response";
import { BufferedFile } from "src/minio/file.model";
import { MinioClientService } from "src/minio/minio.service";
import { PublicFile } from "./publicFile.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ImageUploadService {
    constructor(
        @InjectRepository(PublicFile)
        private publicFilesRepository: Repository<PublicFile>,
        private minioClientService: MinioClientService
    ) { }
    async upload(file: BufferedFile) {
        const { key, url } = await this.minioClientService.upload(file)

        const newFile = this.publicFilesRepository.create({ key, url });

        await this.publicFilesRepository.save(newFile);

        return newFile;
    }
}