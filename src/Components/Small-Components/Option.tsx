export const Options: React.FC = (): JSX.Element => {
  const options: string[] = [
    "Europe",
    "Asia",
    "Africa",
    "Americas",
    "Polar",
    "Oceania",
  ];

  return (
    <>
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </>
  );
};
