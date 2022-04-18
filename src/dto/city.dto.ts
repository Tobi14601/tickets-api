import {IsNotEmpty, IsString} from "class-validator";

export class CityDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly postCode: string;

    @IsNotEmpty()
    @IsString()
    readonly country: string;

    constructor(name: string, postCode: string, country: string) {
        this.name = name;
        this.postCode = postCode;
        this.country = country;
    }


}