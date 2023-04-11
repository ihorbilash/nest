import { ApiProperty } from "@nestjs/swagger";

export class AddImageByIdDto {
    @ApiProperty()
    id: number

    @ApiProperty({ type: 'string', format: 'binary', isArray: true })
    images: Express.Multer.File[]
}
