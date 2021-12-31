import "./Countries.css";

import { Country } from "../Country/Country";

import { Pagination } from "../Pagination/Pagination";

import { Button } from "../Small-Components/Buttons";
import { Title } from "../Small-Components/Title";
import { Select } from "../Select/Select";

import { ShuffleProps, AppDataProps, DataSettersProps } from "../Utils/types";


interface Props {
  appData: AppDataProps;
  dataSetters: DataSettersProps;
  shuffleHandlers: ShuffleProps;
  handleAreaUnits: (e: React.MouseEvent, name: string) => void;
}

export const Countries: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className="country-container">
      <div className="btn-container">
      <div className="button-name">
        <Title title={"Reset the list"} />
        <Button generalName={"btn"} reset={props.dataSetters.setData} data={props.appData.dataForRegion} name={"Reset list"}/>
      </div>
        <div className="button-name">
          <Title title={"Shuffle countries by alphabet"} />
          <Button
            generalName={"btn"}
            handler={props.shuffleHandlers.handleShuffleByOrder}
            name={props.appData.nameShuffle}
          />
        </div>
        <div className="button-name">
          <Title title={"Shuffle countries by region"} />
          <Select setRegion={props.dataSetters.setRegion} />
          <Button
            generalName={"btn"}
            handler={props.shuffleHandlers.handleShuffleByRegion}
            name={"Filter"}
          />
        </div>
        <div className="button-name area-countries">
          <div>
            <Title title={"Find countries that smaller than:"} />
            <input
              placeholder="Type in a country"
              id="country-name"
              value={props.appData.bySpecificCountry || ""}
              onChange={(e) => {
                props.dataSetters.setbySpecificCountry(e.target.value);
                props.shuffleHandlers.handleShuffleBySpecificCountry();
              }}
            />
          </div>
          <div className="button-name">
            <Title title={"Shuffle countries by area size"}/>
            <Button
            generalName={"btn"}
            handler={props.shuffleHandlers.handleShuffleBySize}
            name={props.appData.letterOrder}
            />
          </div>
        </div>
      </div>
      {props.appData.data.length > 0 ? (
        <>
          <Pagination
            data={props.appData.data}
            RenderComponent={Country}
            pageLimit={8}
            dataLimit={10}
            handleAreaUnits={props.handleAreaUnits}
            miles={props.appData.miles}
          />
        </>
      ) : null}
    </div>
  );
};
