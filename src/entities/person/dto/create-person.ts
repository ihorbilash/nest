import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator'


export class CreatePersonDto {
	@IsString()
	@ApiProperty({ example: 'Vasya', description: "name of user" })
	name: string;
	@ApiProperty({ example: 173, description: "height of human" })
	height: number;
	@ApiProperty({ example: 17, description: "massa of body" })
	@IsNumber()
	mass: number;
	@ApiProperty({ example: 'green', description: "color" })
	hair_color: string;
	@ApiProperty({ example: 'green', description: "color" })
	skin_color: string;
	@ApiProperty({ example: 'green', description: "color" })
	eye_color: string;
	@ApiProperty({ example: '1897', description: "birth" })
	birth_year: string;
	@ApiProperty({ example: 'male', description: "only male or female" })
	gender: string;
	@ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
	created: string;
	@ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
	edited: string;

	@ApiProperty({ type: 'string', format: 'binary',isArray:true } )
	images:Express.Multer.File[]


}
