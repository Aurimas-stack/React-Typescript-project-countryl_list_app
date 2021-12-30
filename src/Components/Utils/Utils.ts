
import { DataProvider } from './types';

const kmToMiles = 0.3861;

export const getMiles = (area: number): number => {
    return Math.ceil((area * kmToMiles * 100) / 100);
}

export const getKms = (area:number): number => {
    return Math.ceil(((area / kmToMiles) * 100) / 100);
}

export const getAlphabetOrder = (countries: DataProvider[], order?: string): DataProvider[] => {
    if(order === 'ascending') {
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
}

export const getPaginationGroupArray = (currPage:number, pageLimit:number): number[] => {
    const start = Math.floor((currPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(null).map((_, idx) => start + idx + 1)
}

export const getFilteredRegion = (wantedRegion: DataProvider[] , selectedRegion: string): DataProvider[]  => {
    return wantedRegion.filter((country) => country.region === selectedRegion)
}

export const getCountriesByArea = (data: DataProvider[], order?: string):  DataProvider[]  => {
    if(order === "Smallest") {
        return data.sort((a, b) => a.area - b.area);
    }
    return data.sort((a, b) => b.area - a.area);
}