import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResultDto } from 'src/entities/dto/paginate-result.dto';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { ImageService } from 'src/files/image/image.service';
import { RelationService } from 'src/relation/relation.service';
import { Repository } from 'typeorm';
import { RelationPersonDto } from './dto/relation-person';
import { UpdatePersonDto } from './dto/update-person';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(@InjectRepository(Person) private personRepository: Repository<Person>,
    private relationService: RelationService,
    private imageService: ImageService) { }


  async create(person: Person, file: Express.Multer.File[]) {
    person.images = await this.imageService.uploadFilesS3(file)
    return await this.personRepository.save(person);
  }

  async addImages(person: Person, file: Express.Multer.File[]) {
    let newImages = await this.imageService.uploadFilesS3(file);
    person.images = [...person.images, ...newImages];
    return await this.personRepository.save(person);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginateResultDto<Person>> {
    const skippedItem = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.personRepository.count();
    const persons = await this.personRepository.createQueryBuilder()
      .orderBy("id", "ASC")
      .offset(skippedItem)
      .limit(paginationDto.limit)
      .getMany();
    return {
      data: persons,
      page: paginationDto.page,
      limit: paginationDto.limit,
      totalCount
    };
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: {
        homeworld: true,
        films: true,
        species: true,
        vehicles: true,
        starships: true,
        images: true
      },
      loadEagerRelations: false
    }
    )
    if (person === null) throw new NotFoundException(`Not found person where id=${id}`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    let person = await this.findOne(id);
    Object.assign(person, updatePersonDto);
    return await this.personRepository.save(person);

  }

  async remove(id: number) {
    const person = await this.findOne(id);
    if (person === null) throw new NotFoundException(`Not found person where id=${id}`)
    await this.personRepository.remove(person);
    return person;
  }

  async createRelation(person: Person, entitiesId: RelationPersonDto): Promise<Person> {
    const result = await this.relationService.createRelationEntity(person, { ...entitiesId })
    Object.assign(person, result);
    await this.personRepository.save(person)
    return person;
  }

  async removeRelation(person: Person, entitiesId: RelationPersonDto): Promise<Person> {
    const result = await this.relationService.removeRelations(person, { ...entitiesId });
    Object.assign(person, result);
    await this.personRepository.save(person)
    return person;
  }

}
