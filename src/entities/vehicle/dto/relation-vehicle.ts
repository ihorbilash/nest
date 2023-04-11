import { ApiProperty } from "@nestjs/swagger"

export class RelationVehicleDto {

    @ApiProperty({ type: [Number] })
    pilots?: number[]

    @ApiProperty({ type: [Number] })
    films?: number[]
}