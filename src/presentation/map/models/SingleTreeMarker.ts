export interface SingleTreeMarker {
    type: "single";
    markerId: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string;
    description: string;
    treeId: number;
}