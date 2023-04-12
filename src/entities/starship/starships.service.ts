import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/entities/dto/paginate-result.dto';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { ImageService } from 'src/files/image/image.service';
import { RelationService } from 'src/relation/relation.service';
import { Repository } from 'typeorm';
import { RelationStarshipsDto } from './dto/relation-starship';
import { UpdateStarshipDto } from './dto/update-starship';
import { Starship } from './entities/starship.entity';

@Injectable()
export class StarshipsService {
  constructor(@InjectRepository(Starship) private starshipRepository: Repository<Starship>,
    private relationService: RelationService,
    private imageSrevise: ImageService) { }

  async create(starship: Starship, file: Express.Multer.File[]) {
    starship.images = await this.imageSrevise.uploadFilesS3(file);
    return await this.starshipRepository.save(starship);
  }

  async addImages(starship: Starship, file: Express.Multer.File[]) {
    let images = await this.imageSrevise.uploadFilesS3(file);
    starship.images = [...starship.images, ...images];
    return await this.starshipRepository.save(starship);

  }

  async findAll(paginationDto: PaginationDto): Promise<PaginateResultDto<Starship>> {
    const skippedItem = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.starshipRepository.count();
    const starships = await this.starshipRepository.createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItem)
      .limit(paginationDto.limit)
      .getMany();
    return {
      data: starships,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalCount
    };
  }

  async findOne(id: number) {
    const starship = await this.starshipRepository.findOne({
      where: { id },
      relations: ['pilots', 'films', 'images'],
      loadEagerRelations: false
    });
    if (starship === null) throw new NotFoundException(`Not found starship where id=${id}`);
    return starship;
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const starship = await this.findOne(id);
    if (starship === null) throw new NotFoundException(`Not found starship where id=${id}`);
    Object.assign(starship, updateStarshipDto);
    await this.starshipRepository.save(starship);
    return starship;
  }

  async remove(id: number) {
    const starship = await this.findOne(id);
    if (starship === null) throw new NotFoundException(`Not found starship where id=${id}`);
    await this.starshipRepository.remove(starship);
    return starship;
  }

  async createRelation(starship: Starship, entitiesId: RelationStarshipsDto): Promise<Starship> {
    const result = await this.relationService.createRelationEntity(starship, { ...entitiesId })
    Object.assign(starship, result);
    await this.starshipRepository.save(starship)
    return starship;
  }

  async removeRelation(starship: Starship, entitiesId: RelationStarshipsDto): Promise<Starship> {
    const result = await this.relationService.removeRelations(starship, { ...entitiesId });
    Object.assign(starship, result);
    await this.starshipRepository.save(starship)
    return starship;
  }

}
