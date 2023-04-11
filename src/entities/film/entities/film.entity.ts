import { ApiProperty } from "@nestjs/swagger";
import { Person } from "src/entities/person/entities/person.entity";
import { Planet } from "src/entities/planet/entities/planet.entity";
import { Species } from "src/entities/specie/entities/species.entity";
import { Starship } from "src/entities/starship/entities/starship.entity";
import { Vehicle } from "src/entities/vehicle/entities/vehicle.entity";
import { S3Image } from "src/files/image/entities/image.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'film' })
export class Film {
	@ApiProperty({ example: 1, description: 'unicue code' })
	@PrimaryGeneratedColumn()
	id: number;
	@ApiProperty({ example: 'A New Hope', description: "title film" })
	@Column()
	title: string;
	@ApiProperty({ example: '4', description: "episode id" })
	@Column()
	episode_id: string;
	@ApiProperty({ example: " It is a period of civil war....", description: "like description of film" })
	@Column({ length: 2000 })
	opening_crawl: string;
	@ApiProperty({ example: 'George Lucas', description: "dir name" })
	@Column()
	director: string;
	@ApiProperty({ example: 'Gary Kurtz, Rick McCallum', description: "prod names" })
	@Column()
	producer: string;
	@ApiProperty({ example: '1977-05-25', description: "release date" })
	@Column()
	release_date: string;

	@JoinTable()
	@ManyToMany(() => Person, character => character.films, { eager: true })
	characters: Person[];

	@JoinTable()
	@ManyToMany(() => Planet, planet => planet.films, { eager: true })
	planets: Planet[];

	@JoinTable()
	@ManyToMany(() => Starship, starship => starship.films, { eager: true })
	starships: Starship[];

	@JoinTable()
	@ManyToMany(() => Vehicle, vehicle => vehicle.films, { eager: true })
	vehicles: Vehicle[];

	@JoinTable()
	@ManyToMany(() => Species, specie => specie.films, { eager: true })
	species: Species[];

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


