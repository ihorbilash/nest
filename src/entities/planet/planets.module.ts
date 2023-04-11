import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { RelationService } from 'src/relation/relation.service';
import { ImageModule } from 'src/files/image/image.module';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService,RelationService],
  imports:[TypeOrmModule.forFeature([Planet]),ImageModule]
})
export class PlanetsModule {}
