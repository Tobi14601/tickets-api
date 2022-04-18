import {TicketModel} from "../../repository-api/model/TicketModel";

export class EventEntryResultModel {

    constructor(
        readonly result: EventEntryResult,
        readonly ticket?: TicketModel,
    ) {
    }

}

export enum EventEntryResult {

    ALLOW_ENTRY = "ALLOW_ENTRY",
    DENY_EVENT_NOT_FOUND = "DENY_EVENT_NOT_FOUND",
    DENY_INVALID_CODE = "DENY_INVALID_CODE",
    DENY_ALREADY_ENTERED = "DENY_ALREADY_ENTERED",
    DENY_WRONG_DAY = "DENY_WRONG_DAY",

}