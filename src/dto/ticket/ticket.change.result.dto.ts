import {TicketUpdateResult} from "../../service-api/model/ticket.update.result.model";

export class TicketChangeResultDto {

    constructor(
        readonly id: number,
        readonly barcode: string,
    ) {
    }

}