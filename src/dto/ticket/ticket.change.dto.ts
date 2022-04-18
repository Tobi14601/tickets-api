import {IsNotEmpty, IsString, Matches} from "class-validator";

export class TicketChangeDto {

    @Matches("^[a-zA-Z0-9]{0,8}$")
    @IsString()
    readonly barcode: string;

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

}