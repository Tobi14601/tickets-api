export class TicketModel {

    constructor(
        readonly id: number,
        readonly barcode: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly usedDate?: Date,
    ) {
    }

}