import { Controller, Get, Post, Body, Patch, Param, Delete, Query,
   Put, ParseIntPipe, NotFoundException, ValidationPipe, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species';
import { UpdateSpeciesDto } from './dto/update-species';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/entities/dto/pagination.dto';
import { PaginateResultDto } from 'src/entities/dto/paginate-result.dto';
import { Species } from './entities/species.entity';
import { RelationSpeciesDto } from './dto/relation-species';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interceptorOptions } from 'src/files/image/utils/file-upload';
import { AddImageByIdDto } from 'src/files/image/dto/add-image.dto';
import { RoleGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAccess } from 'src/roles/roles-decorator';
import { Roles } from 'src/roles/roles.enum';

@ApiTags('Species')
@Controller('species')
@ApiBearerAuth()
@UseGuards(RoleGuard,JwtAuthGuard)
@RolesAccess(Roles.ADMIN)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  create(@Body(ValidationPipe) createSpeciesDto: CreateSpeciesDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Species> {
    let specie = new Species();
    Object.assign(specie, createSpeciesDto)
    return this.speciesService.create(specie, file);
  }

  @Post('add-images')
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async addImages(@Body(ValidationPipe) dto: AddImageByIdDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Species> {
    let specie = await this.speciesService.findOne(dto.id);
    if (specie === null) throw new NotFoundException(`not found specie entity where id=${dto.id}`);
    return await this.speciesService.addImages(specie, file);
  }


  @Get()
  @RolesAccess(Roles.ADMIN,Roles.USER)
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginateResultDto<Species>> {
    paginationDto.page = paginationDto.page < 1 ? 1 : paginationDto.page;
    return this.speciesService.findAll({
      ...paginationDto, limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
    });
  }

  @Get(':id')
  @RolesAccess(Roles.ADMIN,Roles.USER)
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }

  @Put('add-relation/:id')
  async addRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesId: RelationSpeciesDto): Promise<Species> {
    const filmEntity = await this.speciesService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.speciesService.createRelation(filmEntity, entitiesId)

  }
  @Put('remove-relation/:id')
  async removeRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesIdDto: RelationSpeciesDto) {
    const filmEntity = await this.speciesService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.speciesService.removeRelation(filmEntity, entitiesIdDto)
  }

}
