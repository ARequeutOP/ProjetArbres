import { Tree } from "@/src/framework/models/Tree";
import { useState } from "react";
import { buildMarkers } from "../map/buildMarkers";

const DEFAULT_REGION = {
    latitude:48.81010057696078,
    longitude: 2.3720530534061273,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

export const useTreeMarkers = (treeList: Tree[]) => {
    const [region, setRegion] = useState(DEFAULT_REGION);
    
    const markers = buildMarkers(treeList, region);

    return { markers, region, setRegion };
}