import {EventsController} from "./events.controller";
import {EventsService} from "../service-api/events.service";
import {It, Mock} from "moq.ts";
import {EventTicketsModel} from "../service-api/model/event.tickets.model";
import {EventModel} from "../repository-api/model/event.model";
import {CityModel} from "../repository-api/model/city.model";
import {TicketModel} from "../repository-api/model/TicketModel";
import {EventOverviewDto} from "../dto/event/event.overview.dto";
import {CityDto} from "../dto/city.dto";
import {EventChangeDto} from "../dto/event/event.change.dto";
import {EventChangeResultDto} from "../dto/event/event.change.result.dto";

describe("EventsController", () => {

    describe("getEvents", () => {
        it("should return all events", async () => {
            let timestamp = new Date();
            let service = new Mock<EventsService>()
                .setup(i => i.getAllEvents())
                .returns(Promise.resolve(
                    [
                        new EventTicketsModel(
                            new EventModel(
                                1,
                                "Test",
                                timestamp,
                                new CityModel(
                                    "Schweinfurt",
                                    "97421",
                                    "DE"
                                )
                            ),
                            [
                                new TicketModel(
                                    1,
                                    "ASDF",
                                    "Tobias",
                                    "Elflein",
                                    null
                                )
                            ],
                        ),
                    ],
                ))
                .object();
            let controller = new EventsController(service);

            expect(await controller.getEvents()).toStrictEqual(
                [
                    new EventOverviewDto(
                        1,
                        "Test",
                        timestamp,
                        new CityDto(
                            "Schweinfurt",
                            "97421",
                            "DE",
                        ),
                        1
                    ),
                ]);
        });
    });

    describe("createEvent", () => {
        it("should fail when date is prior to current day", async () => {
            let service = new Mock<EventsService>().object();
            let controller = new EventsController(service);


            await expect(controller.createEvent(new EventChangeDto("Test", new Date(Date.now() - 48 * 3600 * 1000), new CityDto("Test", "asd", "asd"))))
                .rejects
                .toThrow();
        });
        it("should pass with current date", async () => {
            let timestamp = new Date();
            let service = new Mock<EventsService>()
                .setup(i => i.createEvent("Test", timestamp, It.IsAny()))
                .returns(Promise.resolve(1))
                .object();
            let controller = new EventsController(service);

            await expect(controller.createEvent(new EventChangeDto("Test", timestamp, new CityDto("Test", "asd", "asd"))))
                .resolves
                .toStrictEqual(new EventChangeResultDto(1));
        });
    });
});
