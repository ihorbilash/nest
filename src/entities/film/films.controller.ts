import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ValidationPipe, ParseIntPipe, NotFoundException, UseInterceptors, UploadedFile, UploadedFiles, UsePipes, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film';
import { UpdateFilmDto } from './dto/update-film';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { PaginateResultDto } from 'src/entities/dto/paginate-result.dto';
import { Film } from './entities/film.entity';
import { RelationFilmDto } from './dto/relation-film';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interceptorOptions } from 'src/files/image/utils/file-upload';
import { AddImageByIdDto } from 'src/files/image/dto/add-image.dto';
import { RolesAccess } from 'src/roles/roles-decorator';
import { Roles } from 'src/roles/roles.enum';
import { RoleGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('films')
@Controller('films')
@ApiBearerAuth()
@UseGuards(RoleGuard,JwtAuthGuard)
@RolesAccess(Roles.ADMIN)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async create(@Body() createFilmDto: CreateFilmDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Film> {
    let film = new Film()
    Object.assign(film, createFilmDto)
    return this.filmsService.create(film, file);
  }

  @Post('add-images')
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async addImages(@Body() dto: AddImageByIdDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Film> {
    const film = await this.filmsService.findOne(dto.id)
    if(film===null) throw new NotFoundException(`not found person entity where id=${dto.id}`)
    return this.filmsService.addImages(film, file);
  }

  @Get()
  @RolesAccess(Roles.ADMIN,Roles.USER)
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginateResultDto<Film>> {
    paginationDto.page = paginationDto.page < 1 ? 1 : paginationDto.page;
    return this.filmsService.findAll({ ...paginationDto, limit: paginationDto.limit > 10 ? 10 : paginationDto.limit });
  }

  @Get(':id')
  @RolesAccess(Roles.ADMIN,Roles.USER)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Film> {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  update(@Param(ParseIntPipe) id: number, @Body(ValidationPipe) updateFilmDto: UpdateFilmDto): Promise<Film> {
    return this.filmsService.update(id, updateFilmDto);
  }



  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Film> {
    return this.filmsService.remove(id);
  }


  @Put('add-relation/:id')
  async addRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesId: RelationFilmDto): Promise<Film> {
    const filmEntity = await this.filmsService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.filmsService.createRelation(filmEntity, entitiesId)

  }
  @Put('remove-relation/:id')
  async removeRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesIdDto: RelationFilmDto) {
    const filmEntity = await this.filmsService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.filmsService.removeRelation(filmEntity, entitiesIdDto)
  }
}
