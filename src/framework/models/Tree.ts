export interface Tree {
  idbase: number;
  libellefrancais: string;
  espece: string;
  geo_point_2d: {
        lon: number;
        lat: number;
        }
}