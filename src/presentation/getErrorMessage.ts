import { ApiError } from "@/src/core/errors/ApiError";
import { NetworkError } from "@/src/core/errors/NetworkError";
import { TimeoutError } from "@/src/core/errors/TimeoutError";
import { TreeNotFoundError } from "../core/errors/TreeNotFoundError";

export const getErrorMessage = (error: unknown) => {
    if (error instanceof TimeoutError) {
        return "La requête a pris trop de temps !";
    }
    if (error instanceof NetworkError) {
        return "Vérifiez votre connexion internet !";
    }
    if (error instanceof ApiError && error.statusCode === 400) {
        return "Trop de requêtes!";
    }
    if (error instanceof ApiError && error.statusCode === 404) {
        return "La page est introuvable !";
    }
    if (error instanceof ApiError && error.statusCode === 500) {
        return "Le serveur ne répond plus !";
    }
    if (error instanceof TreeNotFoundError) {
        return "Impossible de récupérer les informations sur cet arbre !";
    }
    return "Un problème inconnu est survenu.";
}