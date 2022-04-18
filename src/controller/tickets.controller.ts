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
    Post,
    Put
} from "@nestjs/common";
import {TicketChangeDto} from "../dto/ticket/ticket.change.dto";
import {TicketDto} from "../dto/ticket.dto";
import {TicketDeleteResultDto} from "../dto/ticket/ticket.delete.result.dto";
import {TicketsService} from "../service-api/tickets.service";
import {TicketCreateResult} from "../service-api/model/ticket.create.result.model";
import {TicketUpdateResult} from "../service-api/model/ticket.update.result.model";
import {TicketDeleteResult} from "../service-api/model/ticket.delete.result";
import {TicketChangeResultDto} from "../dto/ticket/ticket.change.result.dto";

@Controller()
export class TicketsController {

    constructor(
        @Inject("TicketsService") readonly ticketsService: TicketsService,
    ) {
    }

    @Post("/event/:eventId/ticket")
    async createTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Body() ticket: TicketChangeDto
    ): Promise<TicketChangeResultDto> {
        let response = await this.ticketsService.createTicket(eventId, ticket.firstName, ticket.lastName, ticket.barcode.length > 0 ? ticket.barcode : null);

        if (response.result == TicketCreateResult.EVENT_NOT_FOUND) {
            throw new HttpException(`No event with id ${eventId} found`, HttpStatus.NOT_FOUND);
        }

        if (response.result == TicketCreateResult.BARCODE_ALREADY_EXISTS) {
            throw new HttpException(`A ticket with barcode ${ticket.barcode} already exists`, HttpStatus.CONFLICT);
        }

        if (response.result == TicketCreateResult.ITERATION_LIMIT_EXCEEDED) {
            throw new Error("Iteration limit exceeded while creating new barcode");
        }

        return new TicketChangeResultDto(response.id, response.barcode);
    }

    @Get("/event/:eventId/ticket/:ticketId")
    async getTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Param("ticketId", ParseIntPipe) ticketId: number,
    ): Promise<TicketDto> {
        let result = await this.ticketsService.getTicket(eventId, ticketId);
        if (!result) {
            throw new HttpException(`No ticket for event with id ${eventId} and id ${ticketId} found`, HttpStatus.NOT_FOUND);
        }

        return TicketDto.fromTicketModel(result);
    }

    @Put("/event/:eventId/ticket/:ticketId")
    async updateTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Param("ticketId", ParseIntPipe) ticketId: number,
        @Body() ticket: TicketChangeDto
    ): Promise<TicketChangeResultDto> {
        let result = await this.ticketsService.updateTicket(eventId, ticketId, ticket.firstName, ticket.lastName,ticket.barcode.length > 0 ? ticket.barcode : null);

        if (result.result == TicketUpdateResult.NOT_FOUND) {
            throw new HttpException(`No Ticket for event with id ${eventId} and id ${ticketId} found`, HttpStatus.NOT_FOUND);
        }

        if (result.result == TicketUpdateResult.BARCODE_ALREADY_EXISTS) {
            throw new HttpException(`A ticket with barcode ${ticket.barcode} already exists`, HttpStatus.CONFLICT);
        }

        if (result.result == TicketUpdateResult.ITERATION_LIMIT_EXCEEDED) {
            throw new Error("Iteration limit exceeded while creating new barcode");
        }

        return new TicketChangeResultDto(ticketId, result.barcode);
    }

    @Delete("/event/:eventId/ticket/:ticketId")
    async deleteTicket(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Param("ticketId", ParseIntPipe) ticketId: number,
    ): Promise<TicketDeleteResultDto> {
        let result = await this.ticketsService.deleteTicket(eventId, ticketId);
        if (result == TicketDeleteResult.NOT_FOUND) {
            throw new HttpException(`No Ticket for event with id ${eventId} and id ${ticketId} found`, HttpStatus.NOT_FOUND);
        }

        return new TicketDeleteResultDto(ticketId);
    }

}