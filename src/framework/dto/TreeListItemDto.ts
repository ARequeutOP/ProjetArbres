export type TreeListItemDto = {
    idbase: number;
    libellefrancais: string | null;
    espece: string | null;
    geo_point_2d: {
        lon: number;
        lat: number;
    } | null;
}