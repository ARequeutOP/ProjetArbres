export type Tree = {
  idbase: number;
  libellefrancais: string;
  espece: string;
}

export type TreeInfo = Tree & {
    adresse: string;
    circonferenceencm: number;
    hauteurenm: number;
    stadedeveloppement: string;
    geo_point_2d: {
        lon: number,
        lat: number
        }
}

export type TreeService = {
  getTreeList:  (numberTreesLoaded: number) => Promise<Tree[]>;
  getTreeInfo:  (id: string) => Promise<TreeInfo>;
}