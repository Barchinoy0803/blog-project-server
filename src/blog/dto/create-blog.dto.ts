import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsOptional()
    image: string
}
