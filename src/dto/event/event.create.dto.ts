import {CityDto} from "../city.dto";
import {IsDate, IsDefined, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class EventCreateDto {

    @IsNotEmpty()
    @IsString()
    readonly title: String;

    @Type(() => Date)
    @IsDate()
    @IsDefined()
    readonly date: Date;

    @IsDefined()
    @Type(() => CityDto)
    @ValidateNested()
    readonly city: CityDto;


}