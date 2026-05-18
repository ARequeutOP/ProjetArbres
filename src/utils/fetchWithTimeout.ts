export const fetchWithTimeout = async ( url: string, delay: number ) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutID = setTimeout(() => controller.abort(), delay);
    const response = await fetch(url, { signal });
    clearTimeout(timeoutID);
    return response
}