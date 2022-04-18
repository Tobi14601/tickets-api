import {TicketDto} from "../ticket.dto";

export class EventEntryResultDto {

    constructor(
        readonly result: string,
        readonly ticket?: TicketDto,
    ) {
    }

}