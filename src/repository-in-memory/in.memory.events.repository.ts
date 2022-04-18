import {EventsRepository} from "../repository-api/events.repository";
import {CityModel} from "../repository-api/model/city.model";
import {EventModel} from "../repository-api/model/event.model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class InMemoryEventsRepository implements EventsRepository {

    private readonly state: Map<number, EventModel> = new Map();
    private nextEventId: number = 1;

    async createEvent(title: string, date: Date, city: CityModel): Promise<number> {
        this.state.set(this.nextEventId, new EventModel(
            this.nextEventId,
            title,
            new Date(date),
            new CityModel(
                city.name,
                city.postCode,
                city.country
            )
        ));

        return this.nextEventId++;
    }

    async deleteEvent(id: number): Promise<boolean> {
        if (!this.state.has(id)) {
            return false;
        }

        this.state.delete(id);
        return true;
    }

    async getAllEvents(): Promise<Array<EventModel>> {
        return Array.from(this.state.values())
            .map(value => InMemoryEventsRepository.copyEvent(value));
    }

    async getEvent(id: number): Promise<EventModel | null> {
        if (!this.state.has(id)) {
            return null;
        }

        let event = this.state.get(id);
        return InMemoryEventsRepository.copyEvent(event);
    }

    async updateEvent(id: number, title: string, date: Date, city: CityModel): Promise<boolean> {
        if (!this.state.has(id)) {
            return false;
        }

        this.state.set(id, new EventModel(
            id,
            title,
            new Date(date),
            new CityModel(
                city.name,
                city.postCode,
                city.country
            )
        ));

        return true;
    }

    private static copyEvent(model: EventModel): EventModel {
        return new EventModel(
            model.id,
            model.title,
            new Date(model.date),
            new CityModel(
                model.city.name,
                model.city.postCode,
                model.city.country
            )
        );
    }


}