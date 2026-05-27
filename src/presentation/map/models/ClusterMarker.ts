export interface ClusterMarker {
    type: "cluster";
    markerId: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    latitudeDelta: number;
    longitudeDelta: number;
    treeIds: number[];
}