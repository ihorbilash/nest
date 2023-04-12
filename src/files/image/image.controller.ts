import { Controller, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAccess } from 'src/roles/roles-decorator';
import { Roles } from 'src/roles/roles.enum';

@ApiTags('delete-images')
@Controller('image')
@ApiBearerAuth()
@UseGuards(RoleGuard,JwtAuthGuard)
@RolesAccess(Roles.ADMIN)
export class ImageController {
  constructor(private readonly imageService: ImageService) { }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.remove(id);
  }
}
