import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query} from "@nestjs/common";
import {EventOverviewDto} from "../dto/event/event.overview.dto";
import {CityDto} from "../dto/city.dto";
import {EventCreateDto} from "../dto/event/event.create.dto";
import {EventChangeResultDto} from "../dto/event/event.change.result.dto";
import {EventDetailsDto} from "../dto/event/event.details.dto";
import {TicketDto} from "../dto/ticket.dto";
import {EventEntryResultDto} from "../dto/event/event.entry.result.dto";
import {Matches} from "class-validator";
import {EventEntryDto} from "../dto/event/event.entry.dto";

@Controller()
export class EventsController {

    @Get("/events")
    getEvents(): Array<EventOverviewDto> {
        console.log("Get Events");
        return [
            new EventOverviewDto(
                123,
                "Test",
                new Date(),
                new CityDto(
                    "Schweinfurt",
                    "97421",
                    "DE"
                ),
                123
            )
        ];
    }

    @Post("/event")
    createEvent(@Body() event: EventCreateDto): EventChangeResultDto {
        console.log("Create Event");
        console.log(event);
        return new EventChangeResultDto(123);
    }

    @Put("/event/:eventId")
    updateEvent(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Body() event: EventCreateDto
    ): EventChangeResultDto {
        console.log("Update Event");
        console.log(eventId);
        console.log(event);
        return new EventChangeResultDto(456);
    }

    @Get("/event/:eventId")
    getEventDetails(@Param("eventId", ParseIntPipe) eventId: number): EventDetailsDto {
        console.log("Get Event");
        console.log(eventId);
        return new EventDetailsDto(123,
            "Test",
            new Date(),
            new CityDto(
                "Schweinfurt",
                "97421",
                "DE"
            ),
            [
                new TicketDto(
                    456,
                    "12345678",
                    "Tobias",
                    "Elflein",
                    true,
                    null
                )
            ],
        );
    }

    @Delete("/event/:eventId")
    deleteEvent(@Param("eventId", ParseIntPipe) eventId: number): EventChangeResultDto {
        console.log("Delete Event");
        console.log(eventId);
        return new EventChangeResultDto(100);
    }

    @Patch("/event/:eventId/entry")
    eventEntry(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Query() {barcode}: EventEntryDto,
    ): EventEntryResultDto {
        console.log("Event Entry")
        console.log(eventId);
        console.log(barcode);
        return new EventEntryResultDto(
            true,
            new TicketDto(
                123,
                "Hallo",
                "Tobias",
                "Elflein",
                true,
                null
            ),
        );
    }

}