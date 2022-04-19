import {TicketsService} from "../service-api/tickets.service";
import {TicketCreateResult, TicketCreateResultModel} from "../service-api/model/ticket.create.result.model";
import {TicketDeleteResult} from "../service-api/model/ticket.delete.result";
import {TicketModel} from "../repository-api/model/TicketModel";
import {TicketUpdateResult, TicketUpdateResultModel} from "../service-api/model/ticket.update.result.model";
import {TicketsRepository} from "../repository-api/tickets.repository";
import {EventsRepository} from "../repository-api/events.repository";
import {Inject, Injectable} from "@nestjs/common";

const ITERATION_LIMIT = 10_000;
const GENERATED_TICKET_BARCODE_LENGTH = 8;

@Injectable()
export class TicketsServiceImpl implements TicketsService {
    static readonly ID_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    constructor(
        @Inject("TicketsRepository") readonly ticketsRepository: TicketsRepository,
        @Inject("EventsRepository") readonly eventsRepository: EventsRepository,
    ) {
    }

    async createTicket(eventId: number, firstName: string, lastName: string, barcode?: string): Promise<TicketCreateResultModel> {
        let event = await this.eventsRepository.getEvent(eventId);
        if (!event) {
            return new TicketCreateResultModel(TicketCreateResult.EVENT_NOT_FOUND);
        }

        let resultBarcode: string;
        let resultId: number = null;
        let iterations = 0;
        do {
            iterations++;
            resultBarcode = barcode ?? TicketsServiceImpl.generateId(GENERATED_TICKET_BARCODE_LENGTH);
            if (await this.ticketsRepository.getTicketForEventFromBarcode(eventId, resultBarcode)) {
                continue;
            }
            resultId = await this.ticketsRepository.createTicket(eventId, resultBarcode, firstName, lastName);
        } while (!resultId && !barcode && iterations < ITERATION_LIMIT);

        if (iterations >= ITERATION_LIMIT) {
            return new TicketCreateResultModel(TicketCreateResult.ITERATION_LIMIT_EXCEEDED);
        }

        if (!resultId) {
            return new TicketCreateResultModel(TicketCreateResult.BARCODE_ALREADY_EXISTS);
        }

        return new TicketCreateResultModel(
            TicketCreateResult.TICKET_CREATED,
            resultId,
            resultBarcode
        );
    }

    async deleteTicket(eventId: number, ticketId: number): Promise<TicketDeleteResult> {
        return await this.ticketsRepository.deleteTicket(eventId, ticketId)
            ? TicketDeleteResult.SUCCESS
            : TicketDeleteResult.NOT_FOUND;
    }

    async getTicket(eventId: number, ticketId: number): Promise<TicketModel | null> {
        return await this.ticketsRepository.getTicketForEventFromId(eventId, ticketId);
    }

    async updateTicket(eventId: number, ticketId: number, firstName: string, lastName: string, barcode: string): Promise<TicketUpdateResultModel> {
        if (!await this.getTicket(eventId, ticketId)) {
            return new TicketUpdateResultModel(TicketUpdateResult.NOT_FOUND);
        }

        let resultBarcode: string;
        let result = false;
        let iterations = 0;
        do {
            iterations++;
            resultBarcode = barcode ?? TicketsServiceImpl.generateId(GENERATED_TICKET_BARCODE_LENGTH);
            if (await this.ticketsRepository.getTicketForEventFromBarcode(eventId, resultBarcode)) {
                continue;
            }
            result = await this.ticketsRepository.updateTicketDetails(eventId, ticketId, resultBarcode, firstName, lastName);
        } while (!result && !barcode && iterations < ITERATION_LIMIT);

        if (iterations >= ITERATION_LIMIT) {
            return new TicketUpdateResultModel(TicketUpdateResult.ITERATION_LIMIT_EXCEEDED);
        }

        if (!result) {
            return new TicketUpdateResultModel(TicketUpdateResult.BARCODE_ALREADY_EXISTS);
        }

        return new TicketUpdateResultModel(
            TicketUpdateResult.SUCCESS,
            resultBarcode
        );
    }

    private static generateId(length: number): string {
        let result = "";

        for (let i = 0; i < length; i++) {
            result += TicketsServiceImpl.ID_CHARACTERS.charAt(Math.floor(Math.random() * TicketsServiceImpl.ID_CHARACTERS.length));
        }

        return result
    }

}