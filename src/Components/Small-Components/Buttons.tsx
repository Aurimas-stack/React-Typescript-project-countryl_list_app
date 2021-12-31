import React, { MouseEventHandler } from "react";
import { DataProvider } from "../Utils/types";

interface Props {
  generalName: string;
  name: string;
  data?: DataProvider[] | undefined;
  handler?: MouseEventHandler | undefined;
  reset?: (data: DataProvider[]) => void | undefined;
}

export const Button: React.FC<Props> = ({
  generalName,
  handler,
  name,
  reset,
  data,
}): JSX.Element => {
  return (
    <>
      {handler !== undefined && (
        <button className={generalName} onClick={handler}>
          {name}
        </button>
      )}
      {(reset !== undefined && data !== undefined) && (
        <button className={generalName} onClick={() => reset(data)}>
          {name}
        </button>
      )}
    </>
  );
};
