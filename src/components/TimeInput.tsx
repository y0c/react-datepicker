import * as React from 'react';
import SVGIcon from './SVGIcon';

export interface Props {
  /** TimeInput onUp event */
  onUp: () => void;
  /** TimeInput onDown event */
  onDown: () => void;
  /** TimeInput onChange event */
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  /** TimeInput value */
  value: number;
}

const TimeInput: React.FunctionComponent<Props> = ({ onUp, onDown, onChange, value }) => {
  return (
    <div className="time-input">
      <div className="time-input__up">
        <button onClick={onUp}>
          <SVGIcon id="up" />
        </button>
      </div>
      <div className="time-input__text">
        <input type="text" value={value} onChange={onChange} />
      </div>
      <div className="time-input__down">
        <button onClick={onDown}>
          <SVGIcon id="down" />
        </button>
      </div>
    </div>
  );
};

TimeInput.defaultProps = {
  value: 0,
};

export default TimeInput;
