import {CityDto} from "../city.dto";
import {TicketDto} from "../ticket.dto";

export class EventDetailsDto {

    constructor(
        readonly id: number,
        readonly title: string,
        readonly date: Date,
        readonly city: CityDto,
        readonly tickets: Array<TicketDto>
    ) {
    }

}