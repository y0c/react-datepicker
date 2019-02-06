import * as React from 'react';

export interface Props {
  onUp: () => void;
  onDown: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: number;
}

const TimeInput: React.FunctionComponent<Props> = ({ onUp, onDown, onChange, value = 0 }) => {
  return (
    <div className="time-input">
      <div className="time-input__up">
        <button onClick={onUp}>
          <i className="icon icon-up" />
        </button>
      </div>
      <div className="time-input__text">
        <input type="text" value={value} onChange={onChange} />
      </div>
      <div className="time-input__down">
        <button onClick={onDown}>
          <i className="icon icon-down" />
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
