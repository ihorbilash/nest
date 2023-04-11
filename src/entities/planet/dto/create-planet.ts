import { ApiProperty } from "@nestjs/swagger";


export class CreatePlanetDto {
    @ApiProperty({ example: "Tatooine", description: "name of planet" })
    name: string;
    @ApiProperty({ example: 23, description: "description of rotation period" })
    rotation_period: number;
    @ApiProperty({ example: 5, description: "description of orbital period" })
    orbital_period: number;
    @ApiProperty({ example: 2562, description: "planet diameter" })
    diameter: number;
    @ApiProperty({ example: "arid", description: "planet climate" })
    climate: string;
    @ApiProperty({ example: "1 standart", description: "description of gravity" })
    gravity: string;
    @ApiProperty({ example: "desert", description: "terrain of planet" })
    terrain: string;
    @ApiProperty({ example: 1, description: "surface water of planet" })
    surface_water: number;
    @ApiProperty({ example: 20000, description: "quantity of population" })
    population: number;

    @ApiProperty({ example: "2014-12-09T13:50:49.641000Z", description: "create date" })
    created: string;
    @ApiProperty({ example: "2014-12-09T13:50:49.641000Z", description: "date edit" })
    edited: string;

    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    images: Express.Multer.File[]
}


