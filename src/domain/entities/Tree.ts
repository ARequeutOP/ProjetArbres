export interface Tree {
  idbase: number;
  libellefrancais: string;
  espece: string;
}

export interface TreeInfo extends Tree{
    adresse: string;
    circonferenceencm: number;
    hauteurenm: number;
    stadedeveloppement: string;
    geo_point_2d: {
        lon: number,
        lat: number
        }
}