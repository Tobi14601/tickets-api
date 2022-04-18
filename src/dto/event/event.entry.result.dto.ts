import {TicketDto} from "../ticket.dto";

export class EventEntryResultDto {

    constructor(
        readonly allowEntry: boolean,
        readonly ticket: TicketDto,
    ) {
    }

}