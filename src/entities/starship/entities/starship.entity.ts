import { ApiProperty } from "@nestjs/swagger";
import { Film } from "src/entities/film/entities/film.entity";
import { Person } from "src/entities/person/entities/person.entity";
import { S3Image } from "src/files/image/entities/image.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'starship' })
export class Starship {

    @ApiProperty({ example: 1, description: "primary key" })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: "Death Star", description: "name of starship" })
    @Column()
    name: string;
    @ApiProperty({ example: "DS-1 Orbital Battle Station", description: "model of starship" })
    @Column()
    model: string;
    @ApiProperty({ example: "Sienar Fleet Systems", description: "manufacturer of starship" })
    @Column()
    manufacturer: string;
    @ApiProperty({ example: '1000000', description: "cost of starship" })
    @Column()
    cost_in_credits: string;
    @ApiProperty({ example: '100000', description: "length of starship" })
    @Column()
    length: string;
    @ApiProperty({ example: '1891618', description: "max speed of starship" })
    @Column()
    max_atmosphering_speed: string;
    @ApiProperty({ example: '1', description: "crew of starship" })
    @Column()
    crew: string;
    @ApiProperty({ example: '843', description: "passengers of starship" })
    @Column()
    passengers: string;
    @ApiProperty({ example: '10000000', description: "cargo capacity of starship" })
    @Column()
    cargo_capacity: string
    @ApiProperty({ example: "3 years", description: "consumables of starship" })
    @Column()
    consumables: string;
    @ApiProperty({ example: '4.0', description: "rating of starship" })
    @Column()
    hyperdrive_rating: string;
    @ApiProperty({ example: '10', description: "MGLT - starship" })
    @Column()
    MGLT: string;
    @ApiProperty({ example: "Deep Space Mobile Battlestation", description: "class of starship" })
    @Column()
    starship_class: string;

    @ManyToMany(() => Person, person => person.starships)
    pilots: Person[];

    @ManyToMany(() => Film, film => film.starships)
    films: Film[];

    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
    @Column()
    created: string;
    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
    @Column()
    edited: string;

    @ManyToMany(() => S3Image, { cascade: true })
    @JoinTable()
    images: S3Image[]
}
