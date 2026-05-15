export const handleError = (error: unknown) => {
    if (error instanceof DOMException && error.name === "AbortError") throw new Error("Query took too long!")
    else throw error;
}