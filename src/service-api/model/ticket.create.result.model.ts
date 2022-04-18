export class TicketCreateResultModel {

    constructor(
        readonly result: TicketCreateResult,
        readonly id?: number,
        readonly barcode?: string,
    ) {
    }

}

export enum TicketCreateResult {

    TICKET_CREATED,
    BARCODE_ALREADY_EXISTS,
    EVENT_NOT_FOUND,
    ITERATION_LIMIT_EXCEEDED,

}