import { Tree } from "@/src/framework/models/Tree";
import { buildGridCells } from "./buildGridCells";
import { MapMarker } from "./models/MapMarker";
import { Region } from "./models/Region";

export const buildMarkers = (treeList: Tree[], region: Region): MapMarker[] => {
    const cells = buildGridCells(region);
    const markers: MapMarker[] = [];

    const computeCenter = (treeList: Tree[]) => {
        const latitude =
            treeList.reduce(
                (sum, tree) => sum + tree.geo_point_2d.lat,
                0
            ) / treeList.length;

        const longitude =
            treeList.reduce(
                (sum, tree) => sum + tree.geo_point_2d.lon,
                0
            ) / treeList.length;

        return {
            latitude,
            longitude,
        };
    };

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

        const center = computeCenter(treesInCell);

        markers.push({
            type: "cluster",
            markerId: `${cell.row}x${cell.col}`,
            coordinate: {
                latitude: center.latitude,
                longitude: center.longitude,
            },
            latitudeDelta: cell.bounds.maxLat-cell.bounds.minLat,
            longitudeDelta: cell.bounds.maxLon-cell.bounds.minLon,
            treeIds: treesInCell.map((tree) => tree.idbase),
        });
    }

    return markers;
};