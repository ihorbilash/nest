import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, NotFoundException, ParseIntPipe, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet';
import { UpdatePlanetDto } from './dto/update-planet';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginateResultDto } from 'src/dto/paginate-result.dto';
import { Planet } from './entities/planet.entity';
import { RelationPlanetDto } from './dto/relation-planet';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interceptorOptions } from 'src/files/image/utils/file-upload';
import { AddImageByIdDto } from 'src/files/image/dto/add-image.dto';

@ApiTags('Planet')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  create(@Body(ValidationPipe) createPlanetDto: CreatePlanetDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Planet> {
    let planet = new Planet();
    Object.assign(planet, createPlanetDto)
    return this.planetsService.create(planet, file);
  }

  @Post('add-images')
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async addImages(@Body(ValidationPipe) dto: AddImageByIdDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Planet> {
    let planet = await this.planetsService.findOne(dto.id);
    if (planet === null) throw new NotFoundException(`not found planet entity where id=${dto.id}`);
    return await this.planetsService.addImages(planet, file);

  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginateResultDto<Planet>> {
    paginationDto.page = paginationDto.page < 1 ? 1 : paginationDto.page;
    return this.planetsService.findAll({ ...paginationDto, limit: paginationDto.limit > 10 ? 10 : paginationDto.limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }

  @Put('add-relation/:id')
  async addRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesId: RelationPlanetDto): Promise<Planet> {
    const filmEntity = await this.planetsService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.planetsService.createRelation(filmEntity, entitiesId)

  }
  @Put('remove-relation/:id')
  async removeRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesIdDto: RelationPlanetDto): Promise<Planet> {
    const filmEntity = await this.planetsService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.planetsService.removeRelation(filmEntity, entitiesIdDto)
  }

}
