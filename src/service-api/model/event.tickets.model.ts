import {EventModel} from "../../repository-api/model/event.model";
import {TicketModel} from "../../repository-api/model/TicketModel";

export class EventTicketsModel {

    constructor(
        readonly event: EventModel,
        readonly tickets: Array<TicketModel>,
    ) {
    }

}
