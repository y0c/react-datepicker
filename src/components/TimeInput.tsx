import * as React from 'react';
import SVGIcon from './SVGIcon';

export interface Props {
  onUp: () => void;
  onDown: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: number;
}

const TimeInput: React.FunctionComponent<Props> = ({ onUp, onDown, onChange, value }) => {
  return (
    <div className="time-input">
      <div className="time-input__up">
        <button onClick={onUp}>
	        <SVGIcon id="up"/>
        </button>
      </div>
      <div className="time-input__text">
        <input type="text" value={value} onChange={onChange} />
      </div>
      <div className="time-input__down">
        <button onClick={onDown}>
	        <SVGIcon id="down"/>
        </button>
      </div>
    </div>
  );
};

TimeInput.defaultProps = {
  value: 0,
};

export default TimeInput;
