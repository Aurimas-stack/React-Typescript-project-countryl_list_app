import React, { useState, useEffect } from "react";

import { Countries } from "../Countries/Countries";

import "./App.css";

import { DataProvider, ShuffleProps, AppDataProps, DataSettersProps } from "../Utils/types";


import {
  getUnits,
  getAlphabetOrder,
  getFilter,
  getCountriesByArea,
} from "../Utils/Utils";

export default function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>(); 
  const [data, setData] = useState<DataProvider[]>([]); 
  const [miles, setMiles] = useState<string[]>([]); 
  const [nameShuffle, setNameShuffle] = useState<string>("Order by letters"); 
  const [bysize, setbysize] = useState<string>("Order by area"); 
  const [bySpecificCountry, setbySpecificCountry] = useState<string | undefined>(undefined); 
  const [region, setRegion] = useState<string>("Pick a region"); 
  const [dataForRegion, setDataForRegion] = useState<DataProvider[]>([]); 

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const api: string =
          "https://restcountries.com/v2/all?fields=name,region,area,flag";
        const response: Response = await fetch(api);
        const responseData: DataProvider[] = await response.json();
        setLoading(false); 
        setData([...responseData]);
        setDataForRegion([...responseData]);
      } catch (error: any) {
        setLoading(false);
        setError(error.toString());
      }
    };
    getData(); 
  }, []);

  const handleAreaUnits = (e: React.MouseEvent, name: string) => {
    const country: string = name;
    const dataCopy: DataProvider[] = [...data];
    const newMiles: string[] = miles.filter((removeCountry) => {
      return removeCountry !== country;
    });
    const countryCopy: DataProvider[] = getFilter(data, country, "name");
    const countryIndex: number = data
      .map((country) => country.name)
      .indexOf(country);

    if (country === undefined) return;

    if (!miles.includes(country)) {
      countryCopy[0].area = getUnits(countryCopy[0].area, "miles");
      setMiles([...miles, country]);
    } else {
      countryCopy[0].area = getUnits(countryCopy[0].area);
      setMiles(newMiles);
    }

    dataCopy[countryIndex] = countryCopy[0];
    setData(dataCopy);
  };

  const handleShuffleByOrder = () => {
    const dataCopy: DataProvider[] = [...data];

    if (dataCopy[1].name === "Åland Islands") {
      dataCopy[1].name = "Aland Islands";
    }

    if (nameShuffle === "Order by letters" || nameShuffle === "Z/A") {
      getAlphabetOrder(dataCopy, "ascending");
      setNameShuffle("A/Z");
    } else {
      getAlphabetOrder(dataCopy);
      setNameShuffle("Z/A");
    }

    setData(dataCopy);
  };

  const handleShuffleBySize = () => {
    const dataCopy: DataProvider[] = [...data];

    if (bysize === "Order by area" || bysize === "Smallest") {
      getCountriesByArea(dataCopy, "Smallest");
      setbysize("Biggest");
    } else {
      getCountriesByArea(dataCopy);
      setbysize("Smallest");
    }

    setData(dataCopy);
  };

  const handleShuffleBySpecificCountry = () => {
    if (bySpecificCountry === undefined) return;

    if (bySpecificCountry.length <= 1) {
      return setData(dataForRegion);
    }

    setData(
      data.filter((country) =>
        country.name.toLowerCase().includes(bySpecificCountry.toLowerCase())
      )
    );
  };

  const handleShuffleByRegion = (): void => {
    const ifRegionExists: boolean = data.some(
      (country) => country.region === region
    );
    let newArr: DataProvider[];

    if (region === "Pick a region") return;

    if (ifRegionExists) {
      newArr = getFilter(data, region);
    } else {
      newArr = getFilter(dataForRegion, region);
    }

    setData(newArr);
  };

  const shuffleHandlers: ShuffleProps = {
    handleShuffleBySpecificCountry,
    handleShuffleBySize,
    handleShuffleByRegion,
    handleShuffleByOrder,
  }

  const dataSetters: DataSettersProps = {
    setRegion,
    setbySpecificCountry

  }

  const appData: AppDataProps = {
    data,
    miles,
    bysize,
    nameShuffle,
    bySpecificCountry
  }

  return (
    <div className="App">
      <h1 className="title">Country List</h1>
      {loading === true && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {error && <h2>{error}</h2>}
      <Countries
        appData={appData}
        dataSetters={dataSetters}
        shuffleHandlers={shuffleHandlers}
        handleAreaUnits={(e, name) => handleAreaUnits(e, name)}
      />
    </div>
  );
}
