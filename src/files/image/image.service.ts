import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { S3Image } from './entities/image.entity';
import { ConfigService } from '@nestjs/config';
import * as uuid from 'uuid'
import * as path from 'path'
import { ResoponseFromS3 } from './utils/image-interface';


@Injectable()
export class ImageService {
  constructor(@InjectRepository(S3Image) private imageRepository: Repository<S3Image>,
    private configService: ConfigService) { }

  async uploadFilesS3(files: Express.Multer.File[]) {

    let promiseImageData: Promise<Pick<ResoponseFromS3, any>>[] = files.map(f => {
      return this.uploadS3(f.buffer, f.originalname);
    });

    return (await Promise.all(promiseImageData))
      .map(el => {
        let s3Image = new S3Image();
        s3Image.key = el.Key;
        s3Image.location = el.Location;
        return s3Image;
      });

  }

  private async uploadS3(file: Buffer, name: string) {
    const s3 = this.getS3();
    /* somewhere in this method we should create new Entity and write there data from s3*/
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: `${uuid.v4() + path.extname(name)}`,
      Body: file,
    };
    return await new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  private getS3() {
    return new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
    });
  }

  //--------------------------------------------------------------------------------local storage

  create(images: any) {                    // ------------------------------- here any
    let arrayOfImage: S3Image[] = []
    images.map(async el => {
      let imageToSave = new S3Image()
      imageToSave.key = el.Key;
      //  const images =await this.imageRepository.save(imageToSave); // const image = this.manager.save(Image,imageToSave) 
      arrayOfImage.push(imageToSave)
    })
    return arrayOfImage;
  }

  async remove(id: number) {
    const image = await this.imageRepository.findOne({ where: { id } })
    if (image === null) throw new NotFoundException(`not found film entity where id=${id}`);
    await this.imageRepository.remove(image);
    return image;
  }


}




