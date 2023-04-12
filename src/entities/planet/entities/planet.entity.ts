import { ApiProperty } from "@nestjs/swagger";
import { Film } from "src/entities/film/entities/film.entity";
import { Person } from "src/entities/person/entities/person.entity";
import { Species } from "src/entities/specie/entities/species.entity";
import { S3Image } from "src/files/image/entities/image.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "planet" })
export class Planet {
    @ApiProperty({ example: 1, description: 'unicue code' })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: "Tatooine", description: "name of planet" })
    @Column()
    name: string;
    @ApiProperty({ example: '23', description: "description of rotation period" })
    @Column()
    rotation_period:string;
    @ApiProperty({ example: '5', description: "description of orbital period" })
    @Column()
    orbital_period: string;
    @ApiProperty({ example: '2562', description: "planet diameter" })
    @Column()
    diameter: string;
    @ApiProperty({ example: "arid", description: "planet climate" })
    @Column()
    climate: string;
    @ApiProperty({ example: "1 standart", description: "description of gravity" })
    @Column()
    gravity: string;
    @ApiProperty({ example: "desert", description: "terrain of planet" })
    @Column()
    terrain: string;
    @ApiProperty({ example: '1', description: "surface water of planet" })
    @Column()
    surface_water: string;
    @ApiProperty({ example: '20000', description: "quantity of population" })
    @Column()
    population: string;

    @JoinTable()
    @OneToMany(() => Person, person => person.homeworld, { eager: true })
    residents: Person[];

    @ManyToMany(() => Film, film => film.planets)
    films: Film[];

    @OneToMany(() => Species, species => species.homeworld, { eager: true })
    species: Species[]

    @ApiProperty({ example: "2014-12-09T13:50:49.641000Z", description: "create date" })
    @Column()
    created: string;
    @ApiProperty({ example: "2014-12-09T13:50:49.641000Z", description: "date edit" })
    @Column()
    edited: string;


    @ManyToMany(() => S3Image, { cascade: true })
    @JoinTable()
    images: S3Image[]
}


