import "./Countries.css";

import { Country } from "../Country/Country";

import { Pagination } from "../Pagination/Pagination";

import { Button } from "../Small-Components/Buttons";
import { Title } from "../Small-Components/Title";
import { Options } from "../Small-Components/Option";

import { DataProvider } from '../Utils/types'

type Region =
  | "Europe"
  | "Asia"
  | "Africa"
  | "Americas"
  | "Polar"
  | "Oceania"
  | "DEFAULT";

interface Props {
  data: DataProvider[];
  miles: string[];
  nameShuffle: string;
  bysize: string;
  bySpecificCountry: string | undefined;
  region: string;
  setbySpecificCountry: (e: string) => void;
  shuffleBySpecificCountry: () => void;
  shuffleBySize: () => void;
  shuffleByOrder: () => void;
  setRegion: (region: Region) => void;
  changeAreaUnits: (e: React.MouseEvent, name: string) => void;
  shuffleByRegion: () => void;
};

export const Countries: React.FC<Props> = (props): JSX.Element => {
  return  (
    <div className="country-container">
        <div className="btn-container">
          <div className="button-name">
            <Title title={'Shuffle countries by alphabet'}/>
            <Button generalName={'btn'} handler={props.shuffleByOrder} name={props.nameShuffle}/>
          </div>
          <div className="button-name">
            <Title title={'Shuffle countries by region'}/>
            <select
              defaultValue="DEFAULT"
              onChange={(e) => props.setRegion(e.target.value as Region)}
            >
              <option value="DEFAULT" disabled>
                Pick a region
              </option>
              <Options />
            </select>
            <Button generalName={'btn'} handler={props.shuffleByRegion} name={'Filter'}/>
          </div>
          <div className="button-name area-countries">
            <div>
              <Title title={'Find countries that smaller than:'}/>
              <input
                placeholder="Type in a country"
                id="country-name"
                value={props.bySpecificCountry || ''}
                onChange={(e) => {props.setbySpecificCountry(e.target.value); props.shuffleBySpecificCountry()}}
              />
            </div>
            <Button generalName={'btn'} handler={props.shuffleBySize} name={props.bysize}/>
          </div>
        </div>
        {props.data.length > 0 ?
        <>
          <Pagination
            data={props.data}
            RenderComponent={Country}
            pageLimit={8}
            dataLimit={10}
            changeAreaUnits={props.changeAreaUnits}
            miles={props.miles}
          />
        </>
        : null }
    </div>
  ) 
};
