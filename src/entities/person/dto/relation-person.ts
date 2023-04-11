import { ApiProperty } from "@nestjs/swagger";




export class RelationPersonDto {

  @ApiProperty({ type: Number })
  homeworld?: number

  @ApiProperty({ type: [Number] })
  films?: number[]

  @ApiProperty({ type: [Number] })
  species?: number[]

  @ApiProperty({ type: [Number] })
  vehicles?: number[]
  
  @ApiProperty({ type: [Number] })
  starships?: number[]

}






