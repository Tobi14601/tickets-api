import {TicketModel} from "../repository-api/model/TicketModel";

export class TicketDto {

    constructor(
        readonly id: number,
        readonly barcode: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly available: boolean,
        readonly usedDate?: Date
    ) {
    }

    static fromTicketModel(model: TicketModel): TicketDto {
        return new TicketDto(
            model.id,
            model.barcode,
            model.firstName,
            model.lastName,
            !model.usedDate,
            model.usedDate
        )
    }

}