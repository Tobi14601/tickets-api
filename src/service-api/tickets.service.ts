import {TicketCreateResultModel} from "./model/ticket.create.result.model";
import {TicketModel} from "../repository-api/model/TicketModel";
import {TicketUpdateResultModel} from "./model/ticket.update.result.model";
import {TicketDeleteResult} from "./model/ticket.delete.result";

export interface TicketsService {

    /**
     * Creates a ticket and stores it in the database.
     * Creates a random barcode when no barcode is provided.
     *
     * @param eventId to create the ticket for
     * @param firstName of the ticket owner
     * @param lastName of the ticket owner
     * @param barcode for the ticket
     *
     * @return TicketCreateResultModel describing result
     */
    createTicket(eventId: number, firstName: string, lastName: string, barcode?: string): Promise<TicketCreateResultModel>;

    /**
     * Loads a ticket by its event and ticket id.
     *
     * @param eventId from which to load the ticket
     * @param ticketId of the ticket
     *
     * @return TicketModel representation of the ticket
     * @returns null when ticket is not found
     */
    getTicket(eventId: number, ticketId: number): Promise<TicketModel | null>;

    /**
     * Updates the personal information and barcode of the ticket.
     * Creates a random barcode when no barcode is provided.
     *
     * @param eventId for which to update the ticket
     * @param ticketId of the ticket
     * @param firstName new FirstName for the ticket
     * @param lastName new LastName for the ticket
     * @param barcode new Barcode for the ticket
     *
     * @return TicketUpdateResultModel describing result
     */
    updateTicket(eventId: number, ticketId: number, firstName: string, lastName: string, barcode: string): Promise<TicketUpdateResultModel>;

    /**
     * Deletes a single ticket identified by eventId and ticketId.
     *
     * @param eventId for which to delete the ticket
     * @param ticketId of the ticket
     *
     * @return TicketDeleteResult describing delete result
     */
    deleteTicket(eventId: number, ticketId: number): Promise<TicketDeleteResult>;

}