import {CityDto} from "../city.dto";
import {IsDate, IsDefined, IsNotEmpty, IsObject, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class EventChangeDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @Type(() => Date)
    @IsDate()
    @IsDefined()
    readonly date: Date;

    @IsDefined()
    @Type(() => CityDto)
    @IsObject()
    @ValidateNested()
    readonly city: CityDto;

    constructor(title: string, date: Date, city: CityDto) {
        this.title = title;
        this.date = date;
        this.city = city;
    }
}