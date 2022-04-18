import {TicketsRepository} from "../repository-api/tickets.repository";
import {TicketModel} from "../repository-api/model/TicketModel";

class InMemoryTicketsRepository implements TicketsRepository {

    private readonly state: Map<number, Map<number, TicketModel>> = new Map();
    private nextTicketId: number = 1;

    async createTicket(eventId: number, barcode: string, firstName: string, lastName: string): Promise<number | null> {
        let eventState = this.state.get(eventId);
        if (!eventState) {
            eventState = new Map();
            this.state.set(eventId, eventState);
        }

        eventState.set(this.nextTicketId, new TicketModel(this.nextTicketId, barcode, firstName, lastName, null));

        return this.nextTicketId++;
    }

    async deleteTicket(eventId: number, ticketId: number): Promise<boolean> {
        let eventState = this.state.get(eventId);
        if (!eventState) {
            return false;
        }

        if (!eventState.has(ticketId)) {
            return false;
        }

        eventState.delete(ticketId);

        return true;
    }

    async getAllTicketsForEvent(eventId: number): Promise<Array<TicketModel>> {
        let eventState = this.state.get(eventId);
        if (!eventState) {
            return [];
        }

        return Array.from(eventState.values()).map(value => this.copyTicket(value));
    }

    async getTicketForEventFromBarcode(eventId: number, barcode: string): Promise<TicketModel | null> {
        let eventState = this.state.get(eventId);
        if (!eventState) {
            return null;
        }

        for (let ticket of eventState.values()) {
            if (ticket.barcode === barcode) {
                return this.copyTicket(ticket);
            }
        }

        return null;
    }

    async getTicketForEventFromId(eventId: number, ticketId: number): Promise<TicketModel | null> {
        let eventState = this.state.get(eventId);
        if (!eventState) {
            return null;
        }

        if (!eventState.has(ticketId)) {
            return null;
        }

        return this.copyTicket(eventState.get(ticketId));
    }

    async updateTicketDetails(eventId: number, ticketId: number, barcode: string, firstName: string, lastName: string): Promise<boolean> {
        let currentTicket = await this.getTicketForEventFromId(eventId, ticketId);
        if (!currentTicket) {
            return false;
        }

        let eventState = this.state.get(eventId);
        eventState.set(ticketId, new TicketModel(currentTicket.id, barcode, firstName, lastName, currentTicket.usedDate));

        return true;
    }

    async updateTicketUsedDate(eventId: number, ticketId: number, usedDate?: Date): Promise<boolean> {
        let currentTicket = await this.getTicketForEventFromId(eventId, ticketId);
        if (!currentTicket) {
            return false;
        }

        let eventState = this.state.get(eventId);
        eventState.set(ticketId, new TicketModel(
            currentTicket.id,
            currentTicket.barcode,
            currentTicket.firstName,
            currentTicket.lastName,
            usedDate ? new Date(usedDate.getDate()) : null)
        );

        return true;
    }

    private copyTicket(model: TicketModel): TicketModel {
        return new TicketModel(
            model.id,
            model.barcode,
            model.firstName,
            model.lastName,
            model.usedDate ? new Date(model.usedDate.getDate()) : null
        );
    }

}