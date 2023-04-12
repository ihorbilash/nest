import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { RelationService } from 'src/relation/relation.service';
import { ImageModule } from 'src/files/image/image.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService, RelationService],
  imports: [JwtModule,
    TypeOrmModule.forFeature([Species]),
    ImageModule]
})
export class SpeciesModule { }
