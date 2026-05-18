import { MOCK_ERROR, MOCK_TIMEOUT } from "@/config/mock";
import { TreeService } from "./treeService";

const MOCK_TREE_INFO = {
    idbase: 1,
    libellefrancais: "Pommier",
    espece: "Reinette du Mans",
    adresse: "Paris",
    circonferenceencm: 40,
    hauteurenm: 3,
    stadedeveloppement: "Jeune",
    geo_point_2d: {
        "lon":2.38,
        "lat":48.83
    }
}

const MOCK_TREE_LIST = [
    {
        idbase: 1,
        libellefrancais: "Pommier",
        espece: "Reinette du Mans",
    }, {
        idbase: 2,
        libellefrancais: "Pommier",
        espece: "Rubinette",
        }
];

export const mockTreeService: TreeService = {
    getTreeInfo: async (id) => {
        if (MOCK_ERROR) throw new Error("Issue with the network");
        if (MOCK_TIMEOUT) throw new Error("Query took too long!");
        return MOCK_TREE_INFO;
    },
    getTreeList: async (numberTreesLoaded) => {
        if (MOCK_ERROR) throw new Error("Issue with the network");
        if (MOCK_TIMEOUT) throw new Error("Query took too long!");
        return MOCK_TREE_LIST;
    },
}