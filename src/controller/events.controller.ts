import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query
} from "@nestjs/common";
import {EventOverviewDto} from "../dto/event/event.overview.dto";
import {EventChangeDto} from "../dto/event/event.change.dto";
import {EventChangeResultDto} from "../dto/event/event.change.result.dto";
import {EventDetailsDto} from "../dto/event/event.details.dto";
import {TicketDto} from "../dto/ticket.dto";
import {EventEntryResultDto} from "../dto/event/event.entry.result.dto";
import {EventEntryDto} from "../dto/event/event.entry.dto";
import {EventsService} from "../service-api/events.service";
import {EventUpdateResult} from "../service-api/model/event.update.result";
import {EventEntryResult} from "../service-api/model/event.entry.result.model";

@Controller()
export class EventsController {

    constructor(
        @Inject("EventsService") readonly eventsService: EventsService,
    ) {
    }

    @Get("/events")
    async getEvents(): Promise<Array<EventOverviewDto>> {
        let allEvents = await this.eventsService.getAllEvents();
        return allEvents.map(e => EventOverviewDto.fromEventTicketsModel(e));
    }

    @Post("/event")
    async createEvent(@Body() event: EventChangeDto): Promise<EventChangeResultDto> {
        if (new Date(event.date).setUTCHours(0, 0, 0, 0) < new Date().setUTCHours(0, 0, 0, 0)) {
            throw new HttpException("Invalid date provided. It must be >= current date", HttpStatus.BAD_REQUEST);
        }

        let eventId = await this.eventsService.createEvent(event.title, event.date, event.city.toCityModel());

        if (!eventId) {
            throw new Error("Unable to create event");
        }

        return new EventChangeResultDto(eventId);
    }

    @Put("/event/:eventId")
    async updateEvent(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Body() event: EventChangeDto
    ): Promise<EventChangeResultDto> {
        let result = await this.eventsService.updateEvent(eventId, event.title, event.date, event.city.toCityModel());
        if (result == EventUpdateResult.NOT_FOUND) {
            throw new HttpException(`No event with id ${eventId} found`, HttpStatus.NOT_FOUND);
        }

        if (result != EventUpdateResult.SUCCESS) {
            throw new Error("Unable to update event");
        }

        return new EventChangeResultDto(eventId);
    }

    @Get("/event/:eventId")
    async getEventDetails(@Param("eventId", ParseIntPipe) eventId: number): Promise<EventDetailsDto> {
        let result = await this.eventsService.getEventById(eventId);
        if (!result) {
            throw new HttpException(`No event with id ${eventId} found`, HttpStatus.NOT_FOUND);
        }

        return EventDetailsDto.fromEventTicketsModel(result);
    }

    @Delete("/event/:eventId")
    async deleteEvent(@Param("eventId", ParseIntPipe) eventId: number): Promise<EventChangeResultDto> {
        let result = await this.eventsService.deleteEvent(eventId);
        if (result == EventUpdateResult.NOT_FOUND) {
            throw new HttpException(`No event with id ${eventId} found`, HttpStatus.NOT_FOUND);
        }

        if (result != EventUpdateResult.SUCCESS) {
            throw new Error("Unable to delete event");
        }

        return new EventChangeResultDto(eventId);
    }

    @Patch("/event/:eventId/entry")
    async eventEntry(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Query() {barcode}: EventEntryDto,
    ): Promise<EventEntryResultDto> {
        let result = await this.eventsService.eventEntry(eventId, barcode);
        if (result.result == EventEntryResult.DENY_EVENT_NOT_FOUND) {
            throw new HttpException(`No event with id ${eventId} found`, HttpStatus.NOT_FOUND);
        }

        return new EventEntryResultDto(
            result.result,
            result.ticket ? TicketDto.fromTicketModel(result.ticket) : null
        );
    }

}