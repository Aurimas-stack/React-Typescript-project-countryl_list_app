export interface DataProvider {
  flag: string;
  name: string;
  region: string;
  area: number;
}

export type Region =
  | "Europe"
  | "Asia"
  | "Africa"
  | "Americas"
  | "Polar"
  | "Oceania"
  | "DEFAULT";
