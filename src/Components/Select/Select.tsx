import { Region } from "../Utils/types";

import { Options } from "../Small-Components/Option";

interface Props {
  setRegion: (region: Region) => void;
}

export const Select: React.FC<Props> = ({ setRegion }): JSX.Element => {
  return (
    <select
      defaultValue="DEFAULT"
      onChange={(e) => setRegion(e.target.value as Region)}
    >
      <option value="DEFAULT" disabled>
        Pick a region
      </option>
      <Options />
    </select>
  );
};
