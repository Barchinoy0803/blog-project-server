import { IsNotEmpty, IsString } from "class-validator"

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    context: string
    
    @IsString()
    @IsNotEmpty()
    blogId: string
}
