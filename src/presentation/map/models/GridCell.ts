export interface GridCell {
    row: number;
    col: number;
    center: {
        latitude: number;
        longitude: number;
    };
    bounds: {
        minLat: number;
        maxLat: number;
        minLon: number;
        maxLon: number;
    };
}