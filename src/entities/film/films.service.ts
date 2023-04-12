import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { ImageService } from 'src/files/image/image.service';
import { RelationService } from 'src/relation/relation.service';
import { Repository } from 'typeorm';
import { RelationFilmDto } from './dto/relation-film';
import { UpdateFilmDto } from './dto/update-film';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Film) private filmRepository: Repository<Film>,
    private relationService: RelationService,
    private imageService: ImageService) { }


  async create(film: Film, file: Express.Multer.File[]) {
    film.images = await this.imageService.uploadFilesS3(file);
    return await this.filmRepository.save(film);
  }

  async addImages(film: Film, file: Express.Multer.File[]) {
    let newImages = await this.imageService.uploadFilesS3(file);
    film.images = [...film.images, ...newImages];
    return await this.filmRepository.save(film);

  }

  async findAll(paginationDto: PaginationDto) {
    const skippedItem = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.filmRepository.count();
    const films = await this.filmRepository.createQueryBuilder()
      .orderBy('id', 'ASC')
      .offset(skippedItem)
      .limit(paginationDto.limit)
      .getMany();
    return {
      data: films,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalCount
    };
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['characters', 'planets', 'starships', 'vehicles', 'species', 'images'],
      loadEagerRelations: false
    }
    )
    if (film === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.findOne(id);
    if (film === null) throw new NotFoundException(`not found film entity where id=${id}`);
    Object.assign(film, updateFilmDto);
    await this.filmRepository.save(film);
    return film;
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    if (film === null) throw new NotFoundException(`not found film entity where id=${id}`);
    await this.filmRepository.remove(film);
    return film;
  }

  async createRelation(film: Film, entitiesId: RelationFilmDto) {
    const result = await this.relationService.createRelationEntity(film, { ...entitiesId })
    Object.assign(film, result);
    await this.filmRepository.save(film)
    return film;
  }

  async removeRelation(film: Film, entitiesId: RelationFilmDto) {
    const result = await this.relationService.removeRelations(film, { ...entitiesId });
    Object.assign(film, result);
    await this.filmRepository.save(film)
    return film
  }

}
