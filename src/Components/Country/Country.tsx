import "./Country.css";

import { DataProvider } from "../Utils/types";

export interface CountryProps {
  data: DataProvider;
  miles: string[];
  onHandleAreaUnits: (e: React.MouseEvent, name: string) => void;
}

export const Country: React.FC<CountryProps> = (props): JSX.Element => {
  return (
    <div className="country">
      <div className="flag-container">
        <img className="flag" src={props.data.flag} alt="flag" />
      </div>
      <div className="country-info">
        <p className="info">
          <span className="info-name">Country: </span>
          {props.data.name}
        </p>
        <p className="info">
          <span className="info-name">Region: </span>
          {props.data.region}
        </p>
        <p className="info">
          <span className="info-name">Area: </span>
          {props.data.area}
          <button
            className="area-btn"
            onClick={(e) => props.onHandleAreaUnits(e, props.data.name)}
          >
            {props.miles.includes(props.data.name) ? " miles²" : " km²"}
          </button>
        </p>
      </div>
    </div>
  );
};
