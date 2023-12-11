import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFile } from './publicFile.entity';
import { MinioClientModule } from 'src/minio/minio.module';
import { ImageUploadService } from './image-upload.service';

@Module({
    providers: [
        FilesService,
        ImageUploadService
    ],
    imports: [
        TypeOrmModule.forFeature([PublicFile]),
        MinioClientModule
    ],
    exports: [
        FilesService,
        ImageUploadService
    ]
})
export class FilesModule { }
