import { getSubdivision } from "./getSubdivision";
import { GridCell } from "./models/GridCell";
import { Region } from "./models/Region";

export const buildGridCells = (region: Region): GridCell[] => {
    const {subdiv_lat, subdiv_lon} = getSubdivision(region);

    const cellWidth = 360 / subdiv_lon;
    const cellHeight = 180 / subdiv_lat;

    const minVisibleLat = region.latitude - region.latitudeDelta / 2;
    const maxVisibleLat = region.latitude + region.latitudeDelta / 2;
    const minVisibleLon = region.longitude - region.longitudeDelta / 2;
    const maxVisibleLon = region.longitude + region.longitudeDelta / 2;

    const rowStart = Math.max(0, Math.floor((minVisibleLat + 90) / cellHeight));
    const rowEnd = Math.min(subdiv_lat - 1, Math.floor((maxVisibleLat + 90) / cellHeight));
    const colStart = Math.max(0, Math.floor((minVisibleLon + 180) / cellWidth));
    const colEnd = Math.min(subdiv_lon - 1, Math.floor((maxVisibleLon + 180) / cellWidth));
    const cells: GridCell[] = [];
    for (let row = rowStart; row <= rowEnd; row++) {
        for (let col = colStart; col <= colEnd; col++) {
            const lat = row * cellHeight - 90;
            const lon = col * cellWidth - 180;

            cells.push({
                row,
                col,
                center: {
                    latitude: lat,
                    longitude: lon,
                },
                bounds: {
                    minLat: lat-cellHeight/2,
                    maxLat: lat+cellHeight/2,
                    minLon: lon-cellWidth/2,
                    maxLon: lon+cellWidth/2,
                },
            });
        }
    }
    
    return cells;
};