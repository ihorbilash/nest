import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, ParseIntPipe, Put, NotFoundException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle';
import { UpdateVehicleDto } from './dto/update-vehicle';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginateResultDto } from 'src/dto/paginate-result.dto';
import { Vehicle } from './entities/vehicle.entity';
import { RelationVehicleDto } from './dto/relation-vehicle';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interceptorOptions } from 'src/files/image/utils/file-upload';
import { AddImageByIdDto } from 'src/files/image/dto/add-image.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  create(@Body() createVehicleDto: CreateVehicleDto, @UploadedFiles() file: Express.Multer.File[]) {
    let vehicle = new Vehicle();
    Object.assign(vehicle, createVehicleDto);
    return this.vehiclesService.create(vehicle, file);
  }

  @Post('add-images')
  @UseInterceptors(FilesInterceptor('images', 10, interceptorOptions))
  @ApiConsumes('multipart/form-data')
  async addImages(@Body() dto: AddImageByIdDto, @UploadedFiles() file: Express.Multer.File[]): Promise<Vehicle> {
    let vehicle = await this.vehiclesService.findOne(dto.id);
    if (vehicle === null) throw new NotFoundException(`not found vehicle entity where id=${dto.id}`);
    return await this.vehiclesService.addImages(vehicle, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginateResultDto<Vehicle>> {
    paginationDto.page = paginationDto.page < 1 ? 1 : paginationDto.page;
    return this.vehiclesService.findAll({ ...paginationDto, limit: paginationDto.limit > 10 ? 10 : paginationDto.limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }

  @Put('add-relation/:id')
  async addRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesId: RelationVehicleDto): Promise<Vehicle> {
    const filmEntity = await this.vehiclesService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.vehiclesService.createRelation(filmEntity, entitiesId)

  }
  @Put('remove-relation/:id')
  async removeRelation(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) entitiesIdDto: RelationVehicleDto): Promise<Vehicle> {
    const filmEntity = await this.vehiclesService.findOne(id);
    if (filmEntity === null) throw new NotFoundException(`not found film entity where id=${id}`);
    return this.vehiclesService.removeRelation(filmEntity, entitiesIdDto)
  }

}
