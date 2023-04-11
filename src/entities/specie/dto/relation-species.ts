import { ApiProperty } from "@nestjs/swagger"

export class RelationSpeciesDto {

    @ApiProperty({ type: Number })
    homeworld?: number
  
    @ApiProperty({ type: [Number] })
    people?: number[]
  
    @ApiProperty({ type: [Number] })
    films?: number[]
  
  }