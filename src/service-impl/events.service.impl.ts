import {EventsService} from "../service-api/events.service";
import {CityModel} from "../repository-api/model/city.model";
import {EventEntryResult, EventEntryResultModel} from "../service-api/model/event.entry.result.model";
import {EventTicketsModel} from "../service-api/model/event.tickets.model";
import {Inject, Injectable} from "@nestjs/common";
import {EventsRepository} from "../repository-api/events.repository";
import {TicketsRepository} from "../repository-api/tickets.repository";
import {EventUpdateResult} from "../service-api/model/event.update.result";

@Injectable()
export class EventsServiceImpl implements EventsService {

    constructor(
        @Inject("EventsRepository") readonly eventsRepository: EventsRepository,
        @Inject("TicketsRepository") readonly ticketsRepository: TicketsRepository,
    ) {
    }

    async createEvent(title: string, date: Date, city: CityModel): Promise<number | null> {
        if (new Date(date).setUTCHours(0, 0, 0, 0) < new Date().setUTCHours(0, 0, 0, 0)) {
            //Event would have been created in the past
            return null;
        }

        return await this.eventsRepository.createEvent(title, date, city);
    }

    async deleteEvent(id: number): Promise<EventUpdateResult> {
        //No extra validation required because repository returns only true when the event existed
        await this.ticketsRepository.deleteAllTicketsForEvent(id);
        return await this.eventsRepository.deleteEvent(id) ? EventUpdateResult.SUCCESS : EventUpdateResult.NOT_FOUND;
    }

    async eventEntry(id: number, barcode: string): Promise<EventEntryResultModel> {
        let event = await this.eventsRepository.getEvent(id);
        if (!event) {
            return new EventEntryResultModel(
                EventEntryResult.DENY_EVENT_NOT_FOUND,
                null
            );
        }

        let ticket = await this.ticketsRepository.getTicketForEventFromBarcode(id, barcode);
        if (!ticket) {
            return new EventEntryResultModel(
                EventEntryResult.DENY_INVALID_CODE,
                null
            );
        }

        if (ticket.usedDate) {
            return new EventEntryResultModel(
                EventEntryResult.DENY_ALREADY_ENTERED,
                ticket
            );
        }

        if (new Date().setUTCHours(0,0,0,0) !== new Date(event.date).setUTCHours(0,0,0,0)) {
            return new EventEntryResultModel(
                EventEntryResult.DENY_WRONG_DAY,
                ticket
            );
        }

        if (!await this.ticketsRepository.updateTicketUsedDate(event.id, ticket.id, new Date())) {
            //Only possible reason for this is when the event / ticket gets deleted between the time we
            //load the ticket, and we update the time
            throw Error(`Unable to update Ticket used date for event ${event.id} barcode ${barcode}`);
        }

        return new EventEntryResultModel(
            EventEntryResult.ALLOW_ENTRY,
            ticket
        );
    }

    async getAllEvents(): Promise<Array<EventTicketsModel>> {
        let events = await this.eventsRepository.getAllEvents();
        let tickets = await this.ticketsRepository.getAllTicketsForEvents(new Set(events.map(e => e.id)));


        let result = new Array<EventTicketsModel>();
        for (let event of events) {
            result.push(new EventTicketsModel(event, tickets.get(event.id)));
        }


        return result;
    }

    async getEventById(id: number): Promise<EventTicketsModel | null> {
        let event = await this.eventsRepository.getEvent(id);
        if (!event) {
            return null;
        }

        let tickets = await this.ticketsRepository.getAllTicketsForEvent(event.id);

        return new EventTicketsModel(
            event,
            tickets
        );
    }

    async updateEvent(id: number, title: string, date: Date, city: CityModel): Promise<EventUpdateResult> {
        if (!await this.eventsRepository.getEvent(id)) {
            return EventUpdateResult.NOT_FOUND;
        }

        return await this.eventsRepository.updateEvent(id, title, date, city)
            ? EventUpdateResult.SUCCESS
            : EventUpdateResult.ERROR;
    }

}