import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { RelationService } from 'src/relation/relation.service';
import { ImageModule } from 'src/files/image/image.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [PersonController],
  providers: [PersonService, RelationService],
  imports: [JwtModule,
    TypeOrmModule.forFeature([Person]),
     ImageModule],
})
export class PeopleModule { }
