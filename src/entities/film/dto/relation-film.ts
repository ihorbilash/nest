import { ApiProperty } from "@nestjs/swagger";




export class RelationFilmDto {

  @ApiProperty({ type: [Number] })
  characters?: number[]

  @ApiProperty({ type: [Number] })
  planets?: number[]

  @ApiProperty({ type: [Number] })
  starships?: number[]

  @ApiProperty({ type: [Number] })
  vehicles?: number[]
  
  @ApiProperty({ type: [Number] })
  species?: number[]

}






