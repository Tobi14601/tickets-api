import {CityDto} from "../city.dto";
import {IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested} from "class-validator";
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


}