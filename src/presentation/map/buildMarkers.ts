import { Tree } from "@/src/framework/models/Tree";
import { buildGridCells } from "./buildGridCells";
import { MapMarker } from "./models/MapMarker";
import { Region } from "./models/Region";

export const buildMarkers = (treeList: Tree[], region: Region): MapMarker[] => {
    const cells = buildGridCells(region);
    const markers: MapMarker[] = [];

    for (const cell of cells) {
        const treesInCell = treeList.filter((tree) => {
            const lat = tree.geo_point_2d.lat;
            const lon = tree.geo_point_2d.lon;
            return (
                lat >= cell.bounds.minLat &&
                lat < cell.bounds.maxLat &&
                lon >= cell.bounds.minLon &&
                lon < cell.bounds.maxLon
            );
        });

        if (treesInCell.length === 0) continue;

        if (treesInCell.length === 1) {
            const tree = treesInCell[0];
            markers.push({
                type: "single",
                markerId: `${cell.row}x${cell.col}`,
                coordinate: {
                    latitude: tree.geo_point_2d.lat,
                    longitude: tree.geo_point_2d.lon,
                },
                title: tree.libellefrancais,
                description: tree.espece,
                treeId: tree.idbase,
            });
            continue;
        }

        markers.push({
            type: "cluster",
            markerId: `${cell.row}x${cell.col}`,
            coordinate: {
                latitude: cell.center.latitude,
                longitude: cell.center.longitude,
            },
            latitudeDelta: cell.bounds.maxLat-cell.bounds.minLat,
            longitudeDelta: cell.bounds.maxLon-cell.bounds.minLon,
            treeIds: treesInCell.map((tree) => tree.idbase),
        });
    }

    return markers;
};