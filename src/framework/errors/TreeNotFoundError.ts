export class TreeNotFoundError extends Error {
    constructor(message = "Tree Not Found") {
        super(message);
        this.name = "TreeNotFoundError";
    }
}