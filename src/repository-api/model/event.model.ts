import {CityModel} from "./city.model";

export class EventModel {

    constructor(
        readonly title: string,
        readonly date: Date,
        readonly city: CityModel,
    ) {
    }

}