import {  KM_TO_MILES_SQUARED } from "./variables";

import { DataProvider } from "./types";

export const getUnits = (area: number, measurement?: string): number => {
  if (measurement === "miles") return Math.ceil((area * KM_TO_MILES_SQUARED * 100) / 100);

  return Math.ceil(((area / KM_TO_MILES_SQUARED) * 100) / 100);
};

export const getAlphabetOrder = (
  countries: DataProvider[],
  order?: string
): DataProvider[] => {
  if (order === "ascending") {
    return countries.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  return countries.sort((a, b) => {
    if (b.name < a.name) {
      return -1;
    }
    if (b.name > a.name) {
      return 1;
    }
    return 0;
  });
};

export const getPaginationGroupArray = (
  currPage: number,
  pageLimit: number
): number[] => {
  const start:number = Math.floor((currPage - 1) / pageLimit) * pageLimit;
  return new Array(pageLimit).fill(null).map((_, idx) => start + idx + 1);
};

export const getCountry = (
  data: DataProvider[],
  selectedCountry: string,
  property?: string
): DataProvider[] => {
  if (property === "name") {
    return data.filter((country) => {
      return country.name === selectedCountry;
    });
  }
  return data.filter((country) => country.region === selectedCountry);
};

export const getCountriesByArea = (
  data: DataProvider[],
  order?: string
): DataProvider[] => {
  if (order === "Smallest") return data.sort((a, b) => a.area - b.area);

  return data.sort((a, b) => b.area - a.area);
};
