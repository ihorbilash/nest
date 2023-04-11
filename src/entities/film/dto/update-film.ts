import { ApiProperty } from '@nestjs/swagger';


export class UpdateFilmDto  { //extends PartialType(CreateFilmDto)

	@ApiProperty({ example: 'A New Hope', description: "title film" })
	title?: string;
	@ApiProperty({ example: 4, description: "episode id" })
	episode_id?: number;
	@ApiProperty({ example:" It is a period of civil war....", description: "like description of film" })
	opening_crawl?: string;
	@ApiProperty({ example: 'George Lucas', description: "dir name" })
	director?: string;
	@ApiProperty({ example: 'Gary Kurtz, Rick McCallum', description: "prod names" })
	producer?: string;
	@ApiProperty({ example: '1977-05-25', description: "release date" })
	release_date?: string;

	@ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
	created?: string;
	@ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
	edited?: string;

}
