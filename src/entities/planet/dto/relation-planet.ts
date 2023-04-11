import { ApiProperty } from "@nestjs/swagger";




export class RelationPlanetDto {

  @ApiProperty({ type: [Number] })
  residents?: number[]

  @ApiProperty({ type: [Number] })
  films?: number[]

  @ApiProperty({ type: [Number] })
  species?: number[]

}






