import { IsString, IsNumber } from "class-validator"


export class CreateCommentDto {
    @IsString({ message: 'Must be a string' })
    readonly text: string;

    @IsNumber({ allowNaN: false }, { message: 'Must be a number' })
    readonly imageId: number;
}