import { ApiError } from "../errors/ApiError";
import { NetworkError } from "../errors/NetworkError";
import { TimeoutError } from "../errors/TimeoutError";

export const getErrorMessage = (error: unknown) => {
    if (error instanceof TimeoutError) {
        return "La requête a pris trop de temps !";
    }
    if (error instanceof NetworkError) {
        return "Vérifiez votre connexion internet !";
    }
    if (error instanceof ApiError && error.statusCode === 404) {
        return "La page est introuvable !";
    }
    if (error instanceof ApiError && error.statusCode === 500) {
        return "Le serveur ne répond plus";
    }
    return "Un problème inconnu est survenu.";
}