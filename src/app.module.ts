import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {EventsController} from "./controller/events.controller";
import {TicketsController} from "./controller/tickets.controller";

@Module({
  imports: [],
  controllers: [
      EventsController,
      TicketsController,
  ],
  providers: [AppService],
})
export class AppModule {}
