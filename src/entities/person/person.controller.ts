import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query, ValidationPipe, 
  NotFoundException, UseInterceptors, UploadedFiles, UseGuards, } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person';
import { UpdatePersonDto } from './dto/update-person';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { PaginateResultDto } from 'src/entities/dto/paginate-result.dto';
import { Person } from './entities/person.entity';
import { RelationPersonDto } from './dto/relation-person';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interceptorOptions } from 'src/files/image/utils/file-upload';
import { AddImageByIdDto } from 'src/files/image/dto/add-image.dto';
import { RolesAccess } from 'src/roles/roles-decorator';
import { Roles } from 'src/roles/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/roles/roles.guard';


@ApiTags('Person')
@Controller('people')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RoleGuard)
@RolesAccess(Roles.ADMIN)
export class PersonController {
  constructor(private readonly peopleService: PersonService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async create(@Body() createPersonDto: CreatePersonDto, @UploadedFiles() file: Express.Multer.File[]):Promise<Person> {
    let person = new Person();
    Object.assign(person, createPersonDto);
    return await this.peopleService.create(person, file);
  }

  @Post('add-images')
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async addImages(@Body(ValidationPipe) dto: AddImageByIdDto, @UploadedFiles() file: Express.Multer.File[]) :Promise<Person>{
    const person = await  this.peopleService.findOne(dto.id);
    if (person === null) throw new NotFoundException(`not found person entity where id=${dto.id}`);
    return await this.peopleService.addImages(person,file);

  }


  @Get()
  @RolesAccess(Roles.ADMIN,Roles.USER)
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginateResultDto<Person>> {
    paginationDto.page = paginationDto.page < 1 ? 1 : paginationDto.page;
    return this.peopleService.findAll({ ...paginationDto, limit: paginationDto.limit > 10 ? 10 : paginationDto.limit });
  }

  @Get(':id')
  @RolesAccess(Roles.ADMIN,Roles.USER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ transform: true })) updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id);
  }

  @Put('add-relation/:id')
  async addRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesId: RelationPersonDto): Promise<Person> {
    const filmEntity = await this.peopleService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.peopleService.createRelation(filmEntity, entitiesId)

  }
  @Put('remove-relation/:id')
  async removeRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesIdDto: RelationPersonDto) {
    const filmEntity = await this.peopleService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.peopleService.removeRelation(filmEntity, entitiesIdDto)
  }
}