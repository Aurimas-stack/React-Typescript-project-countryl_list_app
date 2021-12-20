import React, { useState, useEffect } from 'react';
import { Countries } from '../Countries/Countries';
import './App.css';

export default function App() {
  interface dataProvider {
    flag: string,
    name: string,
    region: string,
    area: number
  }
  const [loading, setLoading] = useState<boolean>(true);//shows spinning element while data loads
  const [error, setError] = useState<string>();//to hold error information
  const [data, setData] = useState<Array<dataProvider>>([]) //to hold all initial data
  const [miles, setMiles] = useState<string[]>([]);//holds countries whichs area was converted to miles
  const [nameShuffle, setNameShuffle] = useState<string>('Order by letters');//for country order by A/Z, Z/A
  const [bysize, setbysize] = useState<string>('Order by area');//for country order by area size
  const [bySpecificCountry, setbySpecificCountry] = useState<string>('Type in a country');//for country which is used for specific order by area (smaller than this country)
  const [region, setRegion] = useState<string>('Pick a region');//to hold region, in order to get all countries in that region
  const [dataForRegion, setDataForRegion] = useState<Array<dataProvider>>([]);//to hold original data for when a region is picked
  
  useEffect(() => {
    const getData = async () => { //function to fetch needed data
      try {
        const api: string = 'https://restcountries.com/v2/all?fields=name,region,area,flag'
        const response = await fetch(api);
        const responseData = await response.json();
        setLoading(false); //once data loads dont show spinning element
        setData([...responseData]);
        setDataForRegion([...responseData]);
      } catch (error: any) {
        setLoading(false);
        setError(error.toString());
      }
    }
    getData(); //fetch information on page load
  }, []);

  const changeAreaUnits = (e: React.MouseEvent, name: string): void => {
    let country:string = name;//country name which's area is going to be converted
    let dataCopy: Array<dataProvider> = [...data]; //copy data array in order to modify it
    let milesCopy: string[] = [...miles];//miles state array copy to modify it
    let newMiles: string[]; // new miles array
    let countryCopy: Array<dataProvider>;
    let countryIndex: number;
    if(country !== undefined) {//check if country state is not empty
      countryCopy = dataCopy.filter(copyCountry => { return copyCountry.name === country});//returns country whichs going to be modifed
      countryIndex = dataCopy.map(country => country.name).indexOf(country);//returns index of that country
      if(!miles.includes(country)) { //if area wasnt converted, convert it to miles and push it to miles array
        countryCopy[0].area = Math.floor(((countryCopy[0].area * 0.38610) * 100) / 100);//changes kms to miles
        dataCopy[countryIndex] = countryCopy[0];//saves changes
        setData(dataCopy);//sets new data in state
        setMiles([...miles, country])//sets miles array which is used to check if element was converted
      } else { //if it was converted, covert it back to kilometers and and remove it from miles array
        countryCopy[0].area = Math.floor(((countryCopy[0].area / 0.38610) * 100) / 100);//changes miles to kms
        dataCopy[countryIndex] = countryCopy[0];//save changes
        newMiles = milesCopy.filter(removeCountry => { return removeCountry !== country})//remove country from miles array
        setData(dataCopy);//sets new data array
        setMiles(newMiles)//sets new miles array
      }
    }
  }

  const shuffleByOrder = (): void => { // for sorting countries by name
    let dataCopy: Array<dataProvider> = [...data];
    if(dataCopy[1].name === 'Åland Islands') {//Because >A<land island uses different unicode for A,
        dataCopy[1].name = 'Aland Islands'// change it to normal A
      }
    if(nameShuffle === 'Order by letters' || nameShuffle === 'Z/A') {//shuffle countries by names A to Z
      dataCopy.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
      setData(dataCopy);
      setNameShuffle('A/Z');
    } else { //shuffle countries by names Z to A
      dataCopy.sort((a, b) => {
        if(b.name < a.name) { return -1; }
        if(b.name > a.name) { return 1; }
        return 0;
    })
      setData(dataCopy);
      setNameShuffle('Z/A');
    }
  }
  const shuffleBySize = (): void => {//shuffle coutries by area size
    let dataCopy: Array<dataProvider> = [...data];
    if(bysize === 'Order by area' || bysize === 'Smallest') {//if button is smallest, sort from smallest to biggest
      dataCopy.sort((a, b) =>  a.area - b.area);
      setData(dataCopy);
      setbysize('Biggest')
    } else {
      dataCopy.sort((a, b) => b.area - a.area)//if button is biggest, sort from biggest to smallest
      setData(dataCopy);
      setbysize('Smallest');
    }
  }
  const shuffleBySpecificCountry = (): void => {//shuffle by countries which is smaller than one written
    const dataCopy: Array<dataProvider> = [...data];//copy data array
    const additionalCopy: Array<dataProvider> = [...dataForRegion]; //additonal data for when the original data state is modifed
    let newData: Array<dataProvider>;//to hold objects in new array after condition
    let countryCopy: Array<dataProvider>; //to hold country object which is used get area for main comparison
    const country = dataCopy.some(country => country.name.toLowerCase() === bySpecificCountry.toLowerCase());//to check if written country is in data object array
    if(country) {//if condition is true then,
      if(dataCopy.length === 250) {//if original array isnt modifed
        countryCopy = dataCopy.filter(copyCountry =>  copyCountry.name.toLowerCase() === bySpecificCountry.toLowerCase());//copy object to variable
        newData = dataCopy.filter(dataCountry => {//main comparison to check which countries are smaller than written one
          if(dataCountry.area < countryCopy[0].area) {
            return dataCountry;
          }
        });
        newData.length === 0 ? setData(countryCopy) : setData(newData);//if there're no smaller countries set country itself 
      } else {
        countryCopy = additionalCopy.filter(copyCountry =>  copyCountry.name.toLowerCase() === bySpecificCountry.toLowerCase());//copy object to variable
        newData = additionalCopy.filter(dataCountry => {//main comparison to check which countries are smaller than written one
          if(dataCountry.area < countryCopy[0].area) {
            return dataCountry;
          }
        });
        newData.length === 0 ? setData(countryCopy) : setData(newData);//if there're no smaller countries set country itself 
      }
    }
  }

  const shuffleByRegion = (): void => {//shuffle countries by a region
    const dataCopy: Array<dataProvider> = [...data];
    const forRegion: Array<dataProvider> = [...dataForRegion];
    const ifRegionExists: boolean = dataCopy.some(country => country.region === region);
    let newArr: Array<dataProvider>;
    if(region !== "Pick a region") {
      if(ifRegionExists) {
        newArr = dataCopy.filter(country => country.region === region);
        setData(newArr);
      } else {
        newArr = forRegion.filter(country => country.region === region);
        setData(newArr);
      }
    }
  }

  return (
    <div className="App">
      <h1 className='title'>Country List</h1>
      { loading === true ? 
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        : null
      }
      {
        error !== undefined ? 
        <h2>{error}</h2>
        : null
      }
      <Countries 
        data={data} 
        changeAreaUnits={(e, name) =>changeAreaUnits(e, name)}
        miles={miles}
        nameShuffle={nameShuffle}
        shuffleByOrder={shuffleByOrder}
        bysize={bysize}
        shuffleBySize={shuffleBySize}
        bySpecificCountry={bySpecificCountry}
        setbySpecificCountry={setbySpecificCountry}
        shuffleBySpecificCountry={shuffleBySpecificCountry}
        region={region}
        setRegion={setRegion}
        shuffleByRegion={shuffleByRegion}/>
    </div>
  );
}

