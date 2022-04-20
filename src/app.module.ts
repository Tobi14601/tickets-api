import { Module } from '@nestjs/common';
import {EventsController} from "./controller/events.controller";
import {TicketsController} from "./controller/tickets.controller";
import {InMemoryEventsRepository} from "./repository-in-memory/in.memory.events.repository";
import {InMemoryTicketsRepository} from "./repository-in-memory/in.memory.tickets.repository";
import {EventsServiceImpl} from "./service-impl/events.service.impl";
import {TicketsServiceImpl} from "./service-impl/tickets.service.impl";

@Module({
  imports: [],
  controllers: [
      EventsController,
      TicketsController,
  ],
  providers: [
      {
          provide: "EventsRepository",
          useClass: InMemoryEventsRepository
      },
      {
          provide: "TicketsRepository",
          useClass: InMemoryTicketsRepository
      },
      {
          provide: "EventsService",
          useClass: EventsServiceImpl
      },
      {
          provide: "TicketsService",
          useClass: TicketsServiceImpl
      },
  ],
})
export class AppModule {}
