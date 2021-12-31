import "./Countries.css";

import { Country } from "../Country/Country";

import { Pagination } from "../Pagination/Pagination";

import { Button } from "../Small-Components/Buttons";
import { Title } from "../Small-Components/Title";
import { Select } from "../Select/Select";

import { DataProvider, Region } from "../Utils/types";



interface Props {
  data: DataProvider[];
  miles: string[];
  nameShuffle: string;
  bysize: string;
  bySpecificCountry: string | undefined;
  setRegion: (region: Region) => void;
  setbySpecificCountry: (e: string) => void;
  handleAreaUnits: (e: React.MouseEvent, name: string) => void;
  onHandleShuffleBySize: () => void;
  onHandleShuffleByOrder: () => void;
  onHandleShuffleByRegion: () => void;
  onHandleShuffleBySpecificCountry: () => void;
}

export const Countries: React.FC<Props> = (props): JSX.Element => {

  return (
    <div className="country-container">
      <div className="btn-container">
        <div className="button-name">
          <Title title={"Shuffle countries by alphabet"} />
          <Button
            generalName={"btn"}
            handler={props.onHandleShuffleByOrder}
            name={props.nameShuffle}
          />
        </div>
        <div className="button-name">
          <Title title={"Shuffle countries by region"} />
          <Select setRegion={props.setRegion} />
          <Button
            generalName={"btn"}
            handler={props.onHandleShuffleByRegion}
            name={"Filter"}
          />
        </div>
        <div className="button-name area-countries">
          <div>
            <Title title={"Find countries that smaller than:"} />
            <input
              placeholder="Type in a country"
              id="country-name"
              value={props.bySpecificCountry || ""}
              onChange={(e) => {
                props.setbySpecificCountry(e.target.value);
                props.onHandleShuffleBySpecificCountry();
              }}
            />
          </div>
          <Button
            generalName={"btn"}
            handler={props.onHandleShuffleBySize}
            name={props.bysize}
          />
        </div>
      </div>
      {props.data.length > 0 ? (
        <>
          <Pagination
            data={props.data}
            RenderComponent={Country}
            pageLimit={8}
            dataLimit={10}
            handleAreaUnits={props.handleAreaUnits}
            miles={props.miles}
          />
        </>
      ) : null}
    </div>
  );
};
