import { ApiProperty } from "@nestjs/swagger";
import { Film } from "src/entities/film/entities/film.entity";
import { Planet } from "src/entities/planet/entities/planet.entity";
import { Species } from "src/entities/specie/entities/species.entity";
import { Starship } from "src/entities/starship/entities/starship.entity";
import { Vehicle } from "src/entities/vehicle/entities/vehicle.entity";
import { S3Image } from "src/files/image/entities/image.entity";

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'person' })
export class Person {
	@ApiProperty({ example: 1, description: 'unicue code' })
	@PrimaryGeneratedColumn()
	id: number;
	@ApiProperty({ example: 'Vasya', description: "name of user" })
	@Column()
	name: string;
	@ApiProperty({ example: '173', description: "height of human" })
	@Column()
	height: string;
	@ApiProperty({ example: "17", description: "massa of body" })
	@Column()
	mass:  string;
	@ApiProperty({ example: 'green', description: "color" })
	@Column()
	hair_color: string;
	@ApiProperty({ example: 'green', description: "color" })
	@Column()
	skin_color: string;
	@ApiProperty({ example: 'green', description: "color" })
	@Column()
	eye_color: string;
	@ApiProperty({ example: '1897', description: "birth" })
	@Column()
	birth_year: string;
	@ApiProperty({ example: 'male', description: "only male or female" })
	@Column()
	gender: string;

	@JoinColumn()
	@ManyToOne(() => Planet, planet => planet.residents)
	homeworld: Planet;

	@ManyToMany(() => Film, film => film.characters)
	films: Film[];

	@ManyToMany(() => Species, specie => specie.people, { eager: true })
	@JoinTable()
	species: Species[];

	@ManyToMany(() => Vehicle, vehicle => vehicle.pilots, { eager: true })
	@JoinTable()
	vehicles: Vehicle[];

	@ManyToMany(() => Starship, starship => starship.pilots, { eager: true })
	@JoinTable()
	starships: Starship[];


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
