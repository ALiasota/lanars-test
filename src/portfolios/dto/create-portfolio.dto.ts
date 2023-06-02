import { IsString, IsNumberString } from "class-validator"


export class CreatePortfolioDto {
    @IsString({ message: 'Must be a string' })
    readonly name: string;
    
    @IsString({ message: 'Must be a string' })
    readonly description: string;

    @IsNumberString({}, { message: 'Must be a number' })
    readonly userId: number;
}