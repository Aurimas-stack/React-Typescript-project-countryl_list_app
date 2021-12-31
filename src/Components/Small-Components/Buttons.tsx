import { MouseEventHandler } from "react";

interface Props {
  generalName: string;
  name: string;
  handler: MouseEventHandler;
}

export const Button: React.FC<Props> = ({
  generalName,
  handler,
  name,
}): JSX.Element => {
  return (
    <button className={generalName} onClick={handler}>
      {name}
    </button>
  );
};
