import { Module } from '@nestjs/common';
import { PeopleModule } from './entities/person/person.module';
import { PlanetsModule } from './entities/planet/planets.module';
import { FilmsModule } from './entities/film/films.module';
import { SpeciesModule } from './entities/specie/species.module';
import { VehiclesModule } from './entities/vehicle/vehicles.module';
import { StarshipsModule } from './entities/starship/starships.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RelationModule } from './relation/relation.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './files/image/image.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SwapiSeederModule } from './swapi-seeder/swapi-seeder.module';


@Module({
  controllers: [],
  providers: [],
  imports: [PeopleModule, PlanetsModule, FilmsModule, SpeciesModule,
     VehiclesModule, StarshipsModule,RelationModule,ImageModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(config),
    MulterModule.register({dest:'./uploads',}),
    AuthModule,
    UsersModule,
    RolesModule,
    SwapiSeederModule,
  ],
})
export class AppModule { }
