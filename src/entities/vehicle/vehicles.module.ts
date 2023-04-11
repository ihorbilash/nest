import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { RelationService } from 'src/relation/relation.service';
import { ImageModule } from 'src/files/image/image.module';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, RelationService],
  imports: [TypeOrmModule.forFeature([Vehicle]), ImageModule]
})
export class VehiclesModule { }
