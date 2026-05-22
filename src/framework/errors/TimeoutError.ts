export class TimeoutError extends Error {
    constructor(message = "Request Timed Out") {
        super(message);
        this.name = "TimeoutError";
    }
}