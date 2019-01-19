import * as React from 'react';

interface Props {
  className?: string;
  text: string;
  subText?: string;
  onClick?: (text: string) => void;
}

const Cell: React.FunctionComponent<Props> = ({ className, text, subText, onClick }) => {
  const handleClick = (value: string) => () => {
    if (onClick) onClick(value);
  };
  return (
    <td onClick={handleClick(text)} className={className}>
      <span>{text}</span>
      {subText && <span className="sub__text">{subText}</span>}
    </td>
  );
};

export default Cell;
