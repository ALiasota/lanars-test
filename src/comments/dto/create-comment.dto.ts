import { IsString, IsNumberString } from "class-validator"


export class CreateCommentDto {
    @IsString({ message: 'Must be a string' })
    readonly text: string;

    @IsNumberString({}, { message: 'Must be a number' })
    readonly imageId: number;
}