import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './app.module';
import {EventsService} from "./service-api/events.service";
import {TicketsService} from "./service-api/tickets.service";
import {EventsRepository} from "./repository-api/events.repository";
import {CityModel} from "./repository-api/model/city.model";

describe('EventsController', () => {
    let app: INestApplication;
    let eventsRepository: EventsRepository;
    let eventsService: EventsService;
    let ticketsService: TicketsService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        eventsRepository = await moduleFixture.resolve("EventsRepository");
        eventsService = await moduleFixture.resolve("EventsService");
        ticketsService = await moduleFixture.resolve("TicketsService");

        await eventsRepository.createEvent("Test", new Date(0), new CityModel("Test", "Test", "Test"))
        await ticketsService.createTicket(1, "Test", "Test", "Test")

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/events (GET)', () => {
        return request(app.getHttpServer())
            .get('/events')
            .expect(200)
            .expect([
                {
                    id: 1,
                    title: 'Test',
                    date: '1970-01-01T00:00:00.000Z',
                    city: {name: 'Test', postCode: 'Test', country: 'Test'},
                    totalTickets: 1
                }
            ]);
    });

    it('/event/1 (GET)', () => {
        return request(app.getHttpServer())
            .get('/event/1')
            .expect(200)
            .expect({
                id: 1,
                title: 'Test',
                date: '1970-01-01T00:00:00.000Z',
                city: {name: 'Test', postCode: 'Test', country: 'Test'},
                tickets: [
                    {
                        id: 1,
                        barcode: 'Test',
                        firstName: 'Test',
                        lastName: 'Test',
                        available: true,
                        usedDate: null
                    }
                ]
            });
    });
});
