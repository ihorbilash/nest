import { ApiProperty } from "@nestjs/swagger";

export class CreateSpeciesDto {

    @ApiProperty({ example: "Human", description: "type of person" })
    name: string;
    @ApiProperty({ example: "mammal", description: " person clasification" })
    classification: string;
    @ApiProperty({ example: "sentient", description: " designation type" })
    designation: string;
    @ApiProperty({ example: 180, description: " height of person" })
    average_height: number;
    @ApiProperty({ example: "caucasian, black, asian, hispanic", description: "type of skin" })
    skin_colors: string;
    @ApiProperty({ example: "blonde, brown, black, red", description: "hair color" })
    hair_colors: string;
    @ApiProperty({ example: "brown, blue, green, hazel, grey, amber", description: "eye color" })
    eye_colors: string;
    @ApiProperty({ example: 100, description: "averege life time" })
    average_lifespan: number;

    @ApiProperty({ example: "Galactic Basic", description: "language" })
    language: string;

    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "date" })
    created: string;
    @ApiProperty({ example: "2014-12-09T13:50:51.644000Z", description: "edit date" })
    edited: string;

    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    images: Express.Multer.File[]

}
