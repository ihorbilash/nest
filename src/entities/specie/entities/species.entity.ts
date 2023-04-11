import { ApiProperty } from "@nestjs/swagger";
import { Film } from "src/entities/film/entities/film.entity";
import { Person } from "src/entities/person/entities/person.entity";
import { Planet } from "src/entities/planet/entities/planet.entity";
import { S3Image } from "src/files/image/entities/image.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "specie" })
export class Species {

    @ApiProperty({ example: 1, description: "primary key" })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: "Human", description: "type of person" })
    @Column()
    name: string;
    @ApiProperty({ example: "mammal", description: " person clasification" })
    @Column()
    classification: string;
    @ApiProperty({ example: "sentient", description: " designation type" })
    @Column()
    designation: string;
    @ApiProperty({ example: '180', description: " height of person" })
    @Column()
    average_height: string;
    @ApiProperty({ example: "caucasian, black, asian, hispanic", description: "type of skin" })
    @Column()
    skin_colors: string;
    @ApiProperty({ example: "blonde, brown, black, red", description: "hair color" })
    @Column()
    hair_colors: string;
    @ApiProperty({ example: "brown, blue, green, hazel, grey, amber", description: "eye color" })
    @Column()
    eye_colors: string;
    @ApiProperty({ example: '100', description: "averege life time" })
    @Column()
    average_lifespan: string;

    @ApiProperty({ example: "Galactic Basic", description: "language" })
    @Column()
    language: string;

    @ManyToOne(() => Planet, planet => planet.species, { onDelete: 'SET NULL' })
    @JoinColumn()
    homeworld: Planet

    @ManyToMany(() => Person, person => person.species)
    people: Person[];

    @ManyToMany(() => Film, film => film.species)
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
