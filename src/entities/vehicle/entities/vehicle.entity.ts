import { ApiProperty } from "@nestjs/swagger"
import { Film } from "src/entities/film/entities/film.entity";
import { Person } from "src/entities/person/entities/person.entity";
import { S3Image } from "src/files/image/entities/image.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'vehicle' })
export class Vehicle {

    @ApiProperty({ example: 1, description: "primary key" })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ example: "Snowspeeder", description: "name of Vehicle" })
    @Column()
    name: string;
    @ApiProperty({ example: "t-47 airspeeder", description: "model of Vehicle" })
    @Column()
    model: string;
    @ApiProperty({ example: "Incom corporation", description: "manufacturer of Vehicle" })
    @Column()
    manufacturer: string;
    @ApiProperty({ example: "unknown", description: "price" })
    @Column()
    cost_in_credits: string;
    @ApiProperty({ example: '4.5', description: "length of Vehicle" })
    @Column()
    length: string;
    @ApiProperty({ example: '650', description: "manufacturer of Vehicle" })
    @Column()
    max_atmosphering_speed: string;
    @ApiProperty({ example: '2', description: "crew of Vehicle" })
    @Column()
    crew: string;
    @ApiProperty({ example: '1', description: "passengers of Vehicle" })
    @Column()
    passengers: string;
    @ApiProperty({ example: '10', description: "cargo capacity of Vehicle" })
    @Column()
    cargo_capacity: string;
    @ApiProperty({ example: "none", description: "consumables of Vehicle" })
    @Column()
    consumables: string;
    @ApiProperty({ example: "airspeeder", description: "vechicle class of Vehicle" })
    @Column()
    vehicle_class: string;

    @ManyToMany(() => Person, person => person.vehicles)
    pilots: Person[];

    @ManyToMany(() => Film, film => film.vehicles)
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
