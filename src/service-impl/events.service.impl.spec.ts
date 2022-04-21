import {InMemoryTicketsRepository} from "../repository-in-memory/in.memory.tickets.repository";
import {InMemoryEventsRepository} from "../repository-in-memory/in.memory.events.repository";
import {EventsServiceImpl} from "./events.service.impl";
import {CityModel} from "../repository-api/model/city.model";
import {TicketsRepository} from "../repository-api/tickets.repository";
import {EventsRepository} from "../repository-api/events.repository";
import {EventsService} from "../service-api/events.service";

describe("EventsServiceImpl", () => {
    describe("deleteEvent", () => {
        let ticketsRepository: TicketsRepository;
        let eventsRepository: EventsRepository;

        let eventsService: EventsService;

        beforeEach(() => {
            ticketsRepository = new InMemoryTicketsRepository();
            eventsRepository = new InMemoryEventsRepository();

            eventsService = new EventsServiceImpl(eventsRepository, ticketsRepository);
        })

        it("should delete tickets when deleting event", async () => {
            await eventsRepository.createEvent("Test", new Date(), new CityModel("Test", "Test", "Test"));
            await ticketsRepository.createTicket(1, "Test", "Test", "Test");

            await eventsService.deleteEvent(1);

            expect(await ticketsRepository.getAllTicketsForEvent(1)).toStrictEqual([]);
            expect(await eventsRepository.getEvent(1)).toBeNull();
        })
    });
});