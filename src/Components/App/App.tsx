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
  const [country, setCountry] = useState<string>(); 
  const [miles, setMiles] = useState<string[]>([]);
  const [nameShuffle, setNameShuffle] = useState<string>('Order by letters');
  const [bysize, setbysize] = useState<string>('Order by area');
  const [bySpecificCountry, setbySpecificCountry] = useState<string>('Type in country');
  
  useEffect(() => {
    const getData = async () => { //function to fetch needed data
      try {
        const api: string = 'https://restcountries.com/v2/all?fields=name,region,area,flag'
        const response = await fetch(api);
        const data = await response.json();
        setLoading(false); //once data loads dont show spinning element
        setData([...data, data]);
      } catch (error: any) {
        setLoading(false);
        setError(error.toString());
      }
    }
    getData(); //fetch information on page load
  }, []);

  const getCountry = (e: React.MouseEvent, name: string) => {
      setCountry(name);
  }
  const leaveCountry = () => {
      setCountry(undefined);
  }
  const changeAreaUnits = () => {
    let dataCopy = [...data]; //copy data in order to modify it
    let milesCopy = [...miles];
    let newMiles: string[];
    if(country !== undefined) {//check if country state is not empty
      let countryCopy = dataCopy.filter(copyCountry => { return copyCountry.name === country});
      const countryIndex:number = dataCopy.map(country => country.name).indexOf(country);
      if(!miles.includes(country)) { //if area wasnt converted, convert it to miles and push it to miles array
        countryCopy[0].area = Math.floor(((countryCopy[0].area * 0.38610) * 100) / 100);
        dataCopy[countryIndex] = countryCopy[0];
        setData(dataCopy);
        setMiles([...miles, country])
      } else { //if it was converted, covert it back to kilometers and and remove it from miles array
        countryCopy[0].area = Math.floor(((countryCopy[0].area / 0.38610) * 100) / 100);
        dataCopy[countryIndex] = countryCopy[0];
        newMiles = milesCopy.filter(removeCountry => { return removeCountry !== country})
        setData(dataCopy);
        setMiles(newMiles)
      }
    }
  }

  const shuffleByOrder = () => { // for sorting countries by name
    let dataCopy = [...data];
    if(dataCopy[1].name === 'Åland Islands') {
        dataCopy[1].name = 'Aland Islands'
      }
    if(nameShuffle === 'Order by letters' || nameShuffle === 'Z/A') {
      dataCopy.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
      setData(dataCopy);
      setNameShuffle('A/Z');
    } else {
      dataCopy.sort((a, b) => {
        if(b.name < a.name) { return -1; }
        if(b.name > a.name) { return 1; }
        return 0;
    })
      setData(dataCopy);
      setNameShuffle('Z/A');
    }
  }
  const shuffleBySize = () => {
    const dataCopy = [...data];
    if(bysize === 'Order by area' || bysize === 'Smallest') {
      dataCopy.sort((a, b) =>  a.area - b.area);
      setData(dataCopy);
      setbysize('Biggest')
    } else {
      dataCopy.sort((a, b) => b.area - a.area)
      setData(dataCopy);
      setbysize('Smallest');
    }
  }

  const shuffleBySpecificCountry = () => {
    const dataCopy = [...data];
    let newData: Array<dataProvider>
    let country = dataCopy.some(country => country.name.toLowerCase() === bySpecificCountry.toLowerCase());
    if(country) {
      let countryCopy = dataCopy.filter(copyCountry =>  {return copyCountry.name === bySpecificCountry});
      newData = dataCopy.filter(dataCountry => {
        if(dataCountry.area < countryCopy[0].area) {
          return dataCountry;
        }
      });
      setData(newData)
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
      <Countries 
        data={data} 
        getCountry={(e, name) =>getCountry(e, name)} 
        leaveCountry={leaveCountry}
        changeAreaUnits={changeAreaUnits}
        miles={miles}
        nameShuffle={nameShuffle}
        shuffleByOrder={shuffleByOrder}
        bysize={bysize}
        shuffleBySize={shuffleBySize}
        bySpecificCountry={bySpecificCountry}
        setbySpecificCountry={setbySpecificCountry}
        shuffleBySpecificCountry={shuffleBySpecificCountry}/>
    </div>
  );
}

