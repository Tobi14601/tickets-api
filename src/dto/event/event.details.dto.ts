import {CityDto} from "../city.dto";
import {TicketDto} from "../ticket.dto";
import {EventTicketsModel} from "../../service-api/model/event.tickets.model";

export class EventDetailsDto {

    constructor(
        readonly id: number,
        readonly title: string,
        readonly date: Date,
        readonly city: CityDto,
        readonly tickets: Array<TicketDto>
    ) {
    }

    static fromEventTicketsModel(model: EventTicketsModel): EventDetailsDto {
        return new EventDetailsDto(
            model.event.id,
            model.event.title,
            model.event.date,
            CityDto.fromCityModel(model.event.city),
            model.tickets.map(TicketDto.fromTicketModel)
        );
    }

}