import {TicketModel} from "./model/TicketModel";

export interface TicketsRepository {

    /**
     * Load all tickets for the given eventIds.
     *
     * @param eventIds to load the tickets for
     * @return A copy of all tickets for the event
     *
     * @returns An empty array when event does not exist or no tickets are created for the event.
     */
    getAllTicketsForEvents(eventIds: Set<number>): Promise<Map<number, Array<TicketModel>>>;

    /**
     * Load all tickets for the given eventId.
     *
     * @param eventId to load the tickets for
     * @return A copy of all tickets for the event
     *
     * @returns An empty array when event does not exist or no tickets are created for the event.
     */
    getAllTicketsForEvent(eventId: number): Promise<Array<TicketModel>>;

    /**
     * Load a single Ticket by event and ticket
     *
     * @param eventId to load ticket from
     * @param ticketId of the ticket
     *
     * @return a copy of the TicketModel
     *
     * @returns null when event or ticket does not exist
     */
    getTicketForEventFromId(eventId: number, ticketId: number): Promise<TicketModel | null>;

    /**
     *
     * @param eventId
     * @param barcode
     *
     * @return a copy of the TicketModel
     *
     * @returns null when event or ticket does not exist
     */
    getTicketForEventFromBarcode(eventId: number, barcode: string): Promise<TicketModel | null>;

    /**
     * Update the ticket details for a single ticket.
     * This does not affect the information if the ticket has been used.
     *
     * @param eventId to update the ticket from
     * @param ticketId of the target ticket
     * @param barcode new Barcode to set for the ticket
     * @param firstName new FirstName to set for the ticket
     * @param lastName new LastName to set for the ticket
     *
     * @return True when the update was performed successfully
     */
    updateTicketDetails(eventId: number, ticketId: number, barcode: string, firstName: string, lastName: string): Promise<boolean>;

    /**
     * Update the information if the ticket has been used.
     * This does not affect the general information of the ticket (Barcode, firstName, lastName).
     *
     * @param eventId to update the ticket from
     * @param ticketId of the target ticket
     * @param usedDate new UsedDate for the ticket.
     *
     * @return True when the update was performed successfully
     */
    updateTicketUsedDate(eventId: number, ticketId: number, usedDate?: Date): Promise<boolean>;

    /**
     * Create a new ticket for the given event.
     *
     * @param eventId to store the ticket to
     * @param barcode of the ticket
     * @param firstName of the ticket
     * @param lastName of the ticket
     *
     * @return Id of the created ticket
     *
     */
    createTicket(eventId: number, barcode: string, firstName: string, lastName: string): Promise<number>;

    /**
     * Delete a single ticket for the event.
     *
     * @param eventId of delete the ticket from
     * @param ticketId to delete
     *
     * @return True when delete was performed successfully
     */
    deleteTicket(eventId: number, ticketId: number): Promise<boolean>;

    /**
     * Deletes all tickets for the given eventId.
     *
     * @param eventId to delete all tickets for
     */
    deleteAllTicketsForEvent(eventId: number): Promise<void>;

}