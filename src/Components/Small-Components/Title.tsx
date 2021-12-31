interface Props {
  title: string;
}

export const Title: React.FC<Props> = ({ title }): JSX.Element => {
  return <h3>{title}</h3>;
};
