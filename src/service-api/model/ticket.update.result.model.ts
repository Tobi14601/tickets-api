export class TicketUpdateResultModel {

    constructor(
        readonly result: TicketUpdateResult,
        readonly barcode?: string,
    ) {
    }

}

export enum TicketUpdateResult {

    SUCCESS,
    BARCODE_ALREADY_EXISTS,
    NOT_FOUND,
    ITERATION_LIMIT_EXCEEDED

}