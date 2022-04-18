import {TicketCreateResultModel} from "./model/ticket.create.result.model";
import {TicketModel} from "../repository-api/model/TicketModel";
import {TicketUpdateResultModel} from "./model/ticket.update.result.model";
import {TicketDeleteResult} from "./model/ticket.delete.result";

export interface TicketsService {

    createTicket(eventId: number, firstName: string, lastName: string, barcode?: string): Promise<TicketCreateResultModel>;

    getTicket(eventId: number, ticketId: number): Promise<TicketModel | null>;

    updateTicket(eventId: number, ticketId: number, firstName: string, lastName: string, barcode: string): Promise<TicketUpdateResultModel>;

    deleteTicket(eventId: number, ticketId: number): Promise<TicketDeleteResult>;

}