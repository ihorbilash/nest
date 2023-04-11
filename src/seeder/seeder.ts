import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "src/entities/film/entities/film.entity";
import { seeder } from "nestjs-seeder";
import { SwapiSeederService } from "src/swapi-seeder/swapi-seeder.service";
import { Person } from "src/entities/person/entities/person.entity";
import { HttpModule } from "@nestjs/axios";
import { Planet } from "src/entities/planet/entities/planet.entity";
import { Species } from "src/entities/specie/entities/species.entity";
import { Starship } from "src/entities/starship/entities/starship.entity";
import { Vehicle } from "src/entities/vehicle/entities/vehicle.entity";
seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12345678',
            database: 'sw1', //starwars sw1
             synchronize:true,
            entities: ["dist/**/*.entity.js"],
        }),
        TypeOrmModule.forFeature([Film, Person,Planet,Species,Starship,Vehicle]),
        HttpModule
    ],
}).run([SwapiSeederService]);