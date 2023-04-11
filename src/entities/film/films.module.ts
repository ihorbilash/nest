import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { RelationService } from 'src/relation/relation.service';
import { ImageModule } from 'src/files/image/image.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, RelationService],
  imports: [JwtModule,
    TypeOrmModule.forFeature([Film]),
    ImageModule,],
})
export class FilmsModule { }
