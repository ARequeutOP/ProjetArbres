export type TreeDetailDto = {
    idbase: number;
    adresse: string | null;
    libellefrancais: string | null;
    espece: string | null;
    circonferenceencm: number | null;
    hauteurenm: number | null;
    stadedeveloppement: string | null;
    geo_point_2d: {
        lon: number;
        lat: number;
    } | null;
}