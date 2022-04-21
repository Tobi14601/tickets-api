import {TicketsRepository} from "../repository-api/tickets.repository";
import {EventsRepository} from "../repository-api/events.repository";
import {InMemoryTicketsRepository} from "../repository-in-memory/in.memory.tickets.repository";
import {InMemoryEventsRepository} from "../repository-in-memory/in.memory.events.repository";
import {CityModel} from "../repository-api/model/city.model";
import {TicketsService} from "../service-api/tickets.service";
import {TicketsServiceImpl} from "./tickets.service.impl";
import {TicketCreateResult, TicketCreateResultModel} from "../service-api/model/ticket.create.result.model";

describe("TicketsServiceImpl", () => {
    describe("createTicket", () => {
        let ticketsRepository: TicketsRepository
        let eventsRepository: EventsRepository

        let ticketsService: TicketsService

        beforeEach(async () => {
            ticketsRepository = new InMemoryTicketsRepository();
            eventsRepository = new InMemoryEventsRepository();
            ticketsService = new TicketsServiceImpl(ticketsRepository, eventsRepository);

            await eventsRepository.createEvent("Test", new Date(), new CityModel("Test", "Test", "Test"))
        })

        it("should throw error when creating ticket for non existing event", async () => {
            await expect(ticketsService.createTicket(2, "Test", "Test", "Test"))
                .resolves
                .toStrictEqual(new TicketCreateResultModel(TicketCreateResult.EVENT_NOT_FOUND))
        })

        it("should return TICKET_CREATED when creating valid ticket", async () => {
            await expect(ticketsService.createTicket(1, "Test", "Test", "Test"))
                .resolves
                .toStrictEqual(new TicketCreateResultModel(TicketCreateResult.TICKET_CREATED, 1, "Test"))
        })

        it("should return BARCODE_ALREADY_EXISTS when creating valid ticket with duplicate barcode", async () => {
            await expect(ticketsService.createTicket(1, "Test1", "Test1", "Test"))
                .resolves
                .toStrictEqual(new TicketCreateResultModel(TicketCreateResult.TICKET_CREATED, 1, "Test"))
            await expect(ticketsService.createTicket(1, "Test2", "Test2", "Test"))
                .resolves
                .toStrictEqual(new TicketCreateResultModel(TicketCreateResult.BARCODE_ALREADY_EXISTS))
        })
    })
})