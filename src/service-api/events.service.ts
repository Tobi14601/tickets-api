import {EventTicketsModel} from "./model/event.tickets.model";
import {CityModel} from "../repository-api/model/city.model";
import {EventEntryResultModel} from "./model/event.entry.result.model";
import {EventUpdateResult} from "./model/event.update.result";

export interface EventsService {

    /**
     * Get all Events and loads the Tickets for these events.
     * @return An array containing a model with event and corresponding tickets
     */
    getAllEvents(): Promise<Array<EventTicketsModel>>;

    /**
     * Load a single event by its id. Also loads all tickets for the event.
     *
     * @param id of the event
     *
     * @return Model containing the event and the tickets
     * @returns null when no event with the given id exists
     */
    getEventById(id: number): Promise<EventTicketsModel | null>;

    /**
     * Creates a new event and stores it in the database.
     *
     * @param title of the event
     * @param date of the event
     * @param city where the event takes place
     *
     * @return Id of the created event.
     * @returns null when the date of the event is in the past.
     */
    createEvent(title: string, date: Date, city: CityModel): Promise<number | null>;

    /**
     * Updates the event in the database.
     * This does not affect tickets.
     *
     * @param id of the event to update
     * @param title new Title of the event
     * @param date new Date of the event
     * @param city new City where the event takes place
     *
     * @return EventUpdateResult with status
     */
    updateEvent(id: number, title: string, date: Date, city: CityModel): Promise<EventUpdateResult>;

    /**
     * Deletes the event and all the associated tickets from the database.
     *
     * @param id of the event to delete
     *
     * @return True when delete was performed successfully
     */
    deleteEvent(id: number): Promise<EventUpdateResult>;

    /**
     * Attempts to allow entry with the given barcode.
     * Only allows entry on the day of the event.
     * Prevents the same barcode to be used more than once.
     *
     * @param id of the event to enter
     * @param barcode to attempt entry with
     *
     * @return EventEntryResultModel containing the ticket data and EventEntryResult
     */
    eventEntry(id: number, barcode: string): Promise<EventEntryResultModel>;


}