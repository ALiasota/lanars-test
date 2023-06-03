import { IsString, IsNumber, IsNumberString } from "class-validator"


export class CreateImageDto {
    @IsString({ message: 'Must be a string' })
    readonly name: string;
    
    @IsString({ message: 'Must be a string' })
    readonly description: string;

    @IsNumberString({}, { message: 'Must be a number' })
    readonly portfolioId: number;

    // @IsNumber({ allowNaN: false }, { message: 'Must be a number' })
    // readonly portfolioId: number;
}