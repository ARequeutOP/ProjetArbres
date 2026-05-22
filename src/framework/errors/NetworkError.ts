export class NetworkError extends Error {
    constructor(message = "Network Request Failed") {
        super(message);
        this.name = "NetworkError";
    }
}