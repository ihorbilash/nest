import { ApiProperty } from "@nestjs/swagger"

export class RelationStarshipsDto {

    @ApiProperty({ type: [Number] })
    pilots?: number[]
  
    @ApiProperty({ type: [Number] })
    films?: number[]
  
  }