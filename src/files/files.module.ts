import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFile } from './publicFile.entity';

@Module({
    providers: [FilesService],
    imports: [TypeOrmModule.forFeature([PublicFile])],
    exports: [FilesService]
})
export class FilesModule { }
