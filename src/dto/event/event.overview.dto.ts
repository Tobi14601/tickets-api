import {CityDto} from "../city.dto";
import {EventTicketsModel} from "../../service-api/model/event.tickets.model";

export class EventOverviewDto {

    constructor(
        readonly id: number,
        readonly title: string,
        readonly date: Date,
        readonly city: CityDto,
        readonly totalTickets: number,
    ) {
    }

    static fromEventTicketsModel(model: EventTicketsModel): EventOverviewDto {
        return new EventOverviewDto(
            model.event.id,
            model.event.title,
            model.event.date,
            CityDto.fromCityModel(model.event.city),
            model.tickets.length
        );
    }

}