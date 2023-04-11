import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, NotFoundException, ParseIntPipe, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship';
import { UpdateStarshipDto } from './dto/update-starship';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginateResultDto } from 'src/dto/paginate-result.dto';
import { Starship } from './entities/starship.entity';
import { RelationStarshipsDto } from './dto/relation-starship';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interceptorOptions } from 'src/files/image/utils/file-upload';
import { AddImageByIdDto } from 'src/files/image/dto/add-image.dto';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  create(@Body(ValidationPipe) createStarshipDto: CreateStarshipDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Starship> {
    let starship = new Starship();
    Object.assign(starship, createStarshipDto);
    return this.starshipsService.create(starship, file);
  }

  @Post('add-images')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  async addImages(@Body() dto: AddImageByIdDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Starship> {
    let starship = await this.starshipsService.findOne(dto.id);
    if (starship === null) throw new NotFoundException(`not found starship entity where id=${dto.id}`);
    return await this.starshipsService.addImages(starship, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginateResultDto<Starship>> {
    paginationDto.page = paginationDto.page > 1 ? 1 : paginationDto.page;
    return this.starshipsService.findAll({ ...paginationDto, limit: paginationDto.limit > 10 ? 10 : paginationDto.limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starshipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }

  @Put('add-relation/:id')
  async addRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesId: RelationStarshipsDto): Promise<Starship> {
    const filmEntity = await this.starshipsService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.starshipsService.createRelation(filmEntity, entitiesId)

  }
  @Put('remove-relation/:id')
  async removeRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesIdDto: RelationStarshipsDto) {
    const filmEntity = await this.starshipsService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.starshipsService.removeRelation(filmEntity, entitiesIdDto)
  }

}
