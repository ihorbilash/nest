import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/entities/dto/paginate-result.dto';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { ImageService } from 'src/files/image/image.service';
import { RelationService } from 'src/relation/relation.service';
import { Repository } from 'typeorm';
import { RelationPlanetDto } from './dto/relation-planet';
import { UpdatePlanetDto } from './dto/update-planet';
import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetsService {
  constructor(@InjectRepository(Planet) private planetRepository: Repository<Planet>,
    private relationService: RelationService,
    private imageService: ImageService) { }


  async create(planet: Planet, file: Express.Multer.File[]) {
    planet.images = await this.imageService.uploadFilesS3(file);
    return this.planetRepository.save(planet);
  }


  async addImages(planet: Planet, file: Express.Multer.File[]) {
    let images = await this.imageService.uploadFilesS3(file);
    planet.images = [...planet.images, ...images];
    return await this.planetRepository.save(planet);
  }

  async findAll(paginateDto: PaginationDto): Promise<PaginateResultDto<Planet>> {
    const skippedItem = (paginateDto.page - 1) * paginateDto.limit;
    const totalCount = await this.planetRepository.count();
    const planets = await this.planetRepository.createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItem)
      .limit(paginateDto.limit)
      .getMany();
    return {
      data: planets,
      page: paginateDto.page,
      limit: paginateDto.limit,
      totalCount
    }
  }

  async findOne(id: number) {
    const planet = await this.planetRepository.findOne({
      where: { id },
      relations: ['residents', 'films', 'species', 'images'],
      loadEagerRelations: false
    });
    if (planet === null) throw new NotFoundException(`not found planet where id=${id}`);
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    let planet = await this.findOne(id);
    if (planet === null) throw new NotFoundException(`not found planet where id=${id}`);
    Object.assign(planet, updatePlanetDto)
    await this.planetRepository.save(planet);
    return planet;
  }

  async remove(id: number) {
    const planet = await this.findOne(id);
    if (planet === null) throw new NotFoundException(`not found planet where id=${id}`);
    await this.planetRepository.remove(planet);
    return planet;
  }

  async createRelation(planet: Planet, entitiesId: RelationPlanetDto): Promise<Planet> {
    const result = await this.relationService.createRelationEntity(planet, { ...entitiesId })
    Object.assign(planet, result);
    await this.planetRepository.save(planet)
    return planet;
  }

  async removeRelation(planet: Planet, entitiesId: RelationPlanetDto): Promise<Planet> {
    const result = await this.relationService.removeRelations(planet, { ...entitiesId });
    Object.assign(planet, result);
    await this.planetRepository.save(planet)
    return planet;
  }


}
