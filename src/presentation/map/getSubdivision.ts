import { Region } from "./models/Region";

export const getSubdivision = (region: Region): {subdiv_lat: number, subdiv_lon: number} => {
    const subdiv_lat = 8*2**Math.round(Math.log2(180 / region.latitudeDelta));
    const subdiv_lon = 8*2**Math.round(Math.log2(360 / region.longitudeDelta));
    return {subdiv_lat, subdiv_lon};
};