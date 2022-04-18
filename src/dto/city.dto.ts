import {IsNotEmpty, IsString} from "class-validator";
import {CityModel} from "../repository-api/model/city.model";

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

    static fromCityModel(model: CityModel): CityDto {
        return new CityDto(model.name, model.postCode, model.country);
    }

    toCityModel(): CityModel {
        return new CityModel(this.name, this.postCode, this.country);
    }

}