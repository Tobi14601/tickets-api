import {CityDto} from "../city.dto";

export class EventOverviewDto {

    constructor(
        readonly id: number,
        readonly title: string,
        readonly date: Date,
        readonly city: CityDto,
        readonly totalTickets: number,
    ) {
    }

}