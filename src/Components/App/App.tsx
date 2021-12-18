import { useState, useEffect } from 'react';
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
  const getData = async () => { //function to fetch needed data
    try {
      const api: string = 'https://restcountries.com/v2/all?fields=name,region,area,flag'
      const response = await fetch(api);
      const data = await response.json();
      setLoading(false); //once data loads dont show spinning element
      setData([...data, data]);
    } catch (error: any) {
      setError(error.toString());
    }
  }

  useEffect(() => {
    getData(); //fetch information on page load
  }, [])

  const changeAreaUnits = () => {

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
      <Countries data={data}/>
    </div>
  );
}

