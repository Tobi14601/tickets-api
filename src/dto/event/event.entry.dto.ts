import {IsNotEmpty, IsString, Matches} from "class-validator";

export class EventEntryDto {

    @Matches("^[a-zA-Z0-9]{1,8}$")
    @IsNotEmpty()
    @IsString()
    readonly barcode: string

}