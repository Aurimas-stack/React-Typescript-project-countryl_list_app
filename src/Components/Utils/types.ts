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

export interface ShuffleProps {
  handleShuffleBySize: () => void;
  handleShuffleByOrder: () => void;
  handleShuffleByRegion: () => void;
  handleShuffleBySpecificCountry: () => void;
}

export interface AppDataProps {
  data: DataProvider[];
  additionalData: DataProvider[];
  miles: string[];
  nameShuffle: string;
  letterOrder: string;
  specificCountry: string | undefined;
}

export interface DataSettersProps {
  setRegion: (region: Region) => void;
  setSpecificCountry: (e: string) => void;
  setData: (data: DataProvider[]) => void;
}