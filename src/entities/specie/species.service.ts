import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/dto/paginate-result.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ImageService } from 'src/files/image/image.service';
import { RelationService } from 'src/relation/relation.service';
import { Repository } from 'typeorm';
import { CreateSpeciesDto } from './dto/create-species';
import { RelationSpeciesDto } from './dto/relation-species';
import { UpdateSpeciesDto } from './dto/update-species';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(@InjectRepository(Species) private speciesRepository: Repository<Species>,
    private relationService: RelationService,
    private imageService: ImageService) { }


  async create(specie: Species, file: Express.Multer.File[]) {
    specie.images = await this.imageService.uploadFilesS3(file);
    return await this.speciesRepository.save(specie);
  }

  async addImages(specie: Species, file: Express.Multer.File[]) {
    let images = await this.imageService.uploadFilesS3(file);
    specie.images = [...specie.images, ...images];
    return await this.speciesRepository.save(specie);
  }


  async findAll(paginationDto: PaginationDto): Promise<PaginateResultDto<Species>> {
    const skippedItem = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.speciesRepository.count();
    const species = await this.speciesRepository.createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItem)
      .limit(paginationDto.limit)
      .getMany();
    return {
      data: species,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalCount
    };
  }

  async findOne(id: number) {
    const specie = this.speciesRepository.findOne({
      where: { id },
      relations: {
        homeworld: true,
        people: true,
        films: true,
        images: true
      },
      loadEagerRelations: false
    })
    if (specie === null) throw new NotFoundException(`not found specie where id=${id}`);
    return specie;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    let specie = await this.findOne(id);
    if (specie === null) throw new NotFoundException(`not found specie where id=${id}`);
    Object.assign(specie, updateSpeciesDto);
    await this.speciesRepository.save(specie);
    return specie;
  }

  async remove(id: number) {
    const specie = await this.findOne(id);
    if (specie === null) throw new NotFoundException(`not found specie where id=${id}`);
    await this.speciesRepository.remove(specie)
    return specie;
  }

  async createRelation(specie: Species, entitiesId: RelationSpeciesDto): Promise<Species> {
    const result = await this.relationService.createRelationEntity(specie, { ...entitiesId })
    Object.assign(specie, result);
    await this.speciesRepository.save(specie)
    return specie;
  }

  async removeRelation(specie: Species, entitiesId: RelationSpeciesDto): Promise<Species> {
    const result = await this.relationService.removeRelations(specie, { ...entitiesId });
    Object.assign(specie, result);
    await this.speciesRepository.save(specie)
    return specie;
  }



}
