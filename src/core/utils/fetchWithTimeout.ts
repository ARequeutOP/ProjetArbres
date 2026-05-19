import { NetworkError } from "../errors/NetworkError";
import { TimeoutError } from "../errors/TimeoutError";

export const fetchWithTimeout = async ( url: string, delay: number ) => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => controller.abort(), delay);

    try {
        const response = await fetch(url, { signal: controller.signal });
        return response
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw new TimeoutError();
        }
        throw new NetworkError();
    } finally {
        clearTimeout(timeoutID);
    }
}