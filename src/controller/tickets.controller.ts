import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {TicketCreateDto} from "../dto/ticket/ticket.create.dto";
import {TicketCreateResultDto} from "../dto/ticket/ticket.create.result.dto";
import {TicketDto} from "../dto/ticket.dto";
import {TicketDeleteResultDto} from "../dto/ticket/ticket.delete.result.dto";

@Controller()
export class TicketsController {

    @Post("/event/:eventId/ticket")
    createTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Body() ticket: TicketCreateDto
    ): TicketCreateResultDto {
        console.log("Create Ticket");
        console.log(eventId);
        console.log(ticket);
        return new TicketCreateResultDto(123, "Hallo");
    }

    @Get("/event/:eventId/ticket/:ticketId")
    getTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Param("ticketId", ParseIntPipe) ticketId: number,
    ): TicketDto {
        console.log("Get Ticket");
        console.log(eventId);
        console.log(ticketId);
        return new TicketDto(123,
            "asd",
            "Tobias",
            "Elflein",
            true,
            null
        );
    }

    @Put("/event/:eventId/ticket/:ticketId")
    updateTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Param("ticketId", ParseIntPipe) ticketId: number,
        @Body() ticket: TicketCreateDto
    ): TicketCreateResultDto {
        console.log("Update Ticket");
        console.log(eventId);
        console.log(ticketId);
        console.log(ticket);
        return new TicketCreateResultDto(123, "asd");
    }

    @Delete("/event/:eventId/ticket/:ticketId")
    deleteTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Param("ticketId", ParseIntPipe) ticketId: number,
    ): TicketDeleteResultDto {
        console.log("Delete Ticket");
        console.log(eventId);
        console.log(ticketId);
        return new TicketDeleteResultDto(123);
    }

}