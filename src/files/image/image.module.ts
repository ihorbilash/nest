import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { S3Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ConfigService],
  imports: [JwtModule,
    TypeOrmModule.forFeature([S3Image])],
  exports: [ImageService]
})
export class ImageModule { }
