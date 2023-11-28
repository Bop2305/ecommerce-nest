import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DEV_POSTGRES_HOST'),
        port: configService.get('DEV_POSTGRES_PORT'),
        username: configService.get('DEV_POSTGRES_USERNAME'),
        password: configService.get('DEV_POSTGRES_PASSWORD'),
        database: configService.get('DEV_POSTGRES_DATABASE'),
        synchronize: true,
        autoLoadEntities: true
      }),
    }),
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
