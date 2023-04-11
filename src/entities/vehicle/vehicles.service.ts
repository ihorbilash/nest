import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/dto/paginate-result.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ImageService } from 'src/files/image/image.service';
import { RelationService } from 'src/relation/relation.service';
import { Repository } from 'typeorm';
import { RelationVehicleDto } from './dto/relation-vehicle';
import { UpdateVehicleDto } from './dto/update-vehicle';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {

  constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    private relationService: RelationService,
    private imageService: ImageService) { }

  async create(vehicle: Vehicle, file: Express.Multer.File[]) {
    vehicle.images = await this.imageService.uploadFilesS3(file);
    return await this.vehicleRepository.save(vehicle);
  }

  async addImages(vehicle: Vehicle, file: Express.Multer.File[]) {
    let images = await this.imageService.uploadFilesS3(file);
    vehicle.images = [...vehicle.images, ...images];
    return await this.vehicleRepository.save(vehicle);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginateResultDto<Vehicle>> {
    const skippedItem = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.vehicleRepository.count();
    const vehicles = await this.vehicleRepository.createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItem)
      .limit(paginationDto.limit)
      .getMany();

    return {
      data: vehicles,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalCount
    };
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['pilots', 'films', 'images'],
      loadEagerRelations: false
    });
    if (vehicle === null) throw new NotFoundException(`Not found vehicle where id=${id}`)
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id);
    if (vehicle === null) throw new NotFoundException(`Not found vehicle where id=${id}`)
    Object.assign(vehicle, updateVehicleDto);
    await this.vehicleRepository.save(vehicle);
    return vehicle;
  }

  async remove(id: number) {
    const vehicle = await this.findOne(id);
    if (vehicle === null) throw new NotFoundException(`Not found vehicle where id=${id}`);
    await this.vehicleRepository.remove(vehicle);
    return vehicle;
  }

  async createRelation(vehicle: Vehicle, entitiesId: RelationVehicleDto): Promise<Vehicle> {
    const result = await this.relationService.createRelationEntity(vehicle, { ...entitiesId })
    Object.assign(vehicle, result);
    await this.vehicleRepository.save(vehicle)
    return vehicle;
  }

  async removeRelation(vehicle: Vehicle, entitiesId: RelationVehicleDto): Promise<Vehicle> {
    const result = await this.relationService.removeRelations(vehicle, { ...entitiesId });
    Object.assign(vehicle, result);
    await this.vehicleRepository.save(vehicle)
    return vehicle;
  }




}
