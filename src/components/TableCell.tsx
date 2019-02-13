import * as React from 'react';
import { ifExistCall } from '../utils/FunctionUtil';

interface Props {
  className?: string;
  text?: string;
  subText?: string;
  onClick?: (text: string) => void;
  onMouseOver?: (text: string) => void;
}

const Cell: React.FunctionComponent<Props> = ({ className, text, subText, onClick, onMouseOver }) => {
  return (
    <td
      onClick={() => ifExistCall(onClick, text)}
      onMouseOver={() => ifExistCall(onMouseOver, text)}
      className={className}
    >
      <div>{text}</div>
      {subText && <span className="sub__text">{subText}</span>}
    </td>
  );
};

export default Cell;
