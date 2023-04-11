
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";





@Entity({ name: 'images' })
export class S3Image {


	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	key: string;

	@Column()
	location: string;
}
