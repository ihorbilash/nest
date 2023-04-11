import { ApiProperty} from '@nestjs/swagger';
import { Film } from 'src/entities/film/entities/film.entity';
import { Planet } from 'src/entities/planet/entities/planet.entity';
import { Species } from 'src/entities/specie/entities/species.entity';
import { Starship } from 'src/entities/starship/entities/starship.entity';
import { Vehicle } from 'src/entities/vehicle/entities/vehicle.entity';


export class UpdatePersonDto {  //extends PartialType  (CreatePersonDto)

	@ApiProperty({ example: 'Vasya', description: "name of user" })
	name?: string;
	@ApiProperty({ example: 173, description: "height of human" })
	height?: number;
	@ApiProperty({ example: 17, description: "massa of body" })
	mass?: number;
	@ApiProperty({ example: 'green', description: "color" })
	hair_color?: string;
	@ApiProperty({ example: 'green', description: "color" })
	skin_color?: string;
	@ApiProperty({ example: 'green', description: "color" })
	eye_color?: string;
	@ApiProperty({ example: '1897', description: "birth" })
	birth_year?: string;
	@ApiProperty({ example: 'male', description: "only male or female" })
	gender?: string;
	@ApiProperty({ example: 'Planet entity', description: "planet of this people" })
	homeworld?: Planet;
	@ApiProperty({ example: "Film[]", description: "films array Entity" })
	films?: Film[];
	@ApiProperty({ example: "Species[]", description: " species array Entity" })
	species?: Species[];
	@ApiProperty({ example:"Vehicle[]", description: "vehicles array entity" })
	vehicles?: Vehicle[];
	@ApiProperty({ example: "Starship[]", description: " vehicles array entity" })
	starships?: Starship[];
	@ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
	created?: string;
	@ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
	edited?: string;
	
}
