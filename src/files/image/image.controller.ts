import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('delete-images')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.remove(id);
  }
}
