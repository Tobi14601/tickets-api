import {CityModel} from "./model/city.model";
import {EventModel} from "./model/event.model";

export interface EventsRepository {

    /**
     * Load all Events.
     *
     * @return A copy of all events
     */
    getAllEvents(): Promise<Array<EventModel>>;

    /**
     * Get a single event by its id.
     *
     * @return The EventModel for the event or null if it doesn't exist
     */
    getEvent(id: number): Promise<EventModel | null>;

    /**
     * Create a new event and store it.
     *
     * @param title Title of the event
     * @param date Date of the event
     * @param city City where the event takes place
     *
     * @return Id of the created event
     */
    createEvent(title: string, date: Date, city: CityModel): Promise<number>;

    /**
     * Update an existing event.
     *
     * @param id of the event to update
     * @param title new Title for the event
     * @param date new Date of the event
     * @param city new City where the event takes place
     *
     * @return True when the update was successful
     */
    updateEvent(id: number, title: string, date: Date, city: CityModel): Promise<boolean>;

    /**
     * Delete an existing event.
     *
     * @param id of the event to delete
     * @return True when the event was deleted successfully
     */
    deleteEvent(id: number): Promise<boolean>;

}