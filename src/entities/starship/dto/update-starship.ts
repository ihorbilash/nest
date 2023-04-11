import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStarshipDto } from './create-starship';

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {

    @ApiProperty({ example: "Death Star", description: "name of starship" })
    name?: string;
    @ApiProperty({ example: "DS-1 Orbital Battle Station", description: "model of starship" })
    model?: string;
    @ApiProperty({ example: "Sienar Fleet Systems", description: "manufacturer of starship" })
    manufacturer?: string;
    @ApiProperty({ example: 1000000, description: "cost of starship" })
    cost_in_credits?: number;
    @ApiProperty({ example: 100000, description: "length of starship" })
    length?: number;
    @ApiProperty({ example: 1891618, description: "max speed of starship" })
    max_atmosphering_speed?: number;
    @ApiProperty({ example: 1, description: "crew of starship" })
    crew?: number;
    @ApiProperty({ example: 843, description: "passengers of starship" })
    passengers?: number;
    @ApiProperty({ example: 10000000, description: "cargo capacity of starship" })
    cargo_capacity?: number
    @ApiProperty({ example: "3 years", description: "consumables of starship" })
    consumables?: string;
    @ApiProperty({ example: 4.0, description: "rating of starship" })
    hyperdrive_rating?: number;
    @ApiProperty({ example: 10, description: "MGLT - starship" })
    MGLT?: number;
    @ApiProperty({ example: "Deep Space Mobile Battlestation", description: "class of starship" })
    starship_class?: string;
   
    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
    created?: string;
    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
    edited?: string;

}
