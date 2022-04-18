import {EventsRepository} from "../repository-api/events.repository";
import {CityModel} from "../repository-api/model/city.model";
import {EventModel} from "../repository-api/model/event.model";

export class InMemoryEventsRepository implements EventsRepository {

    private readonly state: Map<number, EventModel> = new Map();
    private nextEventId: number = 1;

    async createEvent(title: string, date: Date, city: CityModel): Promise<number> {
        this.state.set(this.nextEventId, new EventModel(
            title,
            new Date(date.getDate()),
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
            .map(value => new EventModel(
                    value.title,
                    new Date(value.date.getDate()),
                    new CityModel(
                        value.city.name,
                        value.city.postCode,
                        value.city.country
                    )
                )
            );
    }

    async getEvent(id: number): Promise<EventModel | null> {
        if (!this.state.has(id)) {
            return null;
        }

        let event = this.state.get(id);
        return new EventModel(
            event.title,
            new Date(event.date.getDate()),
            new CityModel(
                event.city.name,
                event.city.postCode,
                event.city.country
            )
        );
    }

    async updateEvent(id: number, title: string, date: Date, city: CityModel): Promise<boolean> {
        if (!this.state.has(id)) {
            return false;
        }

        this.state.set(id, new EventModel(
            title,
            new Date(date.getDate()),
            new CityModel(
                city.name,
                city.postCode,
                city.country
            )
        ));
    }

}