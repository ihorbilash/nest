
import { ApiProperty } from '@nestjs/swagger';


export class UpdateVehicleDto  { // extends PartialType(CreateVehicleDto)

    @ApiProperty({ example: "Snowspeeder", description: "name of Vehicle" })
    name?: string;
    @ApiProperty({ example: "t-47 airspeeder", description: "model of Vehicle" })
    model?: string;
    @ApiProperty({ example: "Incom corporation", description: "manufacturer of Vehicle" })
    manufacturer?: string;
    @ApiProperty({ example: "unknown", description: "price" })
    cost_in_credits?: string;
    @ApiProperty({ example: 4.5, description: "length of Vehicle" })
    length?: number;
    @ApiProperty({ example: 650, description: "manufacturer of Vehicle" })
    max_atmosphering_speed?: number;
    @ApiProperty({ example: 2, description: "crew of Vehicle" })
    crew?: number;
    @ApiProperty({ example: 1, description: "passengers of Vehicle" })
    passengers?: number;
    @ApiProperty({ example: 10, description: "cargo capacity of Vehicle" })
    cargo_capacity?: number;
    @ApiProperty({ example: "none", description: "consumables of Vehicle" })
    consumables?: string;
    @ApiProperty({ example: "airspeeder", description: "vechicle class of Vehicle" })
    vehicle_class?: string;
 
    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
    created?: string;
    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
    edited?: string;

}
