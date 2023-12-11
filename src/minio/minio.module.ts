import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioClientService } from './minio.service';

@Module({
  providers: [MinioClientService],
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: parseInt(configService.get('MINIO_PORT')),
        useSSL: false,
        accessKey: configService.get('MINIO_ACCESS_KEY'),
        secretKey: configService.get('MINIO_SECRET_KEY'),
      }),
    })
  ],
  exports: [MinioClientService]
})
export class MinioClientModule {}
