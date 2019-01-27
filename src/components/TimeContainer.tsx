import * as React from 'react';
import TimeInput from './TimeInput';

interface Props {
  onChange?: (hour: number, minute: number, type: string) => void;
}

interface State {
  hour: number;
  minute: number;
  type: string;
}

interface TypeProps {
  label: string;
  value: string;
  checkValue: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TimeType: React.FunctionComponent<TypeProps> = ({ label, value, checkValue, onChange }) => (
  <label>
    <input
      type="radio"
      className="radio"
      checked={value === checkValue}
      name="type"
      value={value}
      onChange={onChange}
    />
    {label}
  </label>
);
class TimeContainer extends React.Component<Props, State> {
  public state = {
    hour: 0,
    minute: 0,
    type: 'AM',
  };

  public handleChange = (item: string) => (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      {
        ...this.state,
        [item]: parseInt(e.currentTarget.value, 10),
      },
      () => this.invokeOnChange()
    );
  };

  public handleTypeChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      {
        ...this.state,
        hour: 0,
        type: e.currentTarget.value,
      },
      () => this.invokeOnChange()
    );
  };

  public handleUp = (item: string) => () => {
    const { type } = this.state;
    let max: number;

    if (item === 'hour') {
      max = type === 'ALL' ? 24 : 12;
    } else {
      max = 60;
    }
    const value = this.state[item];

    this.setState(
      {
        ...this.state,
        [item]: value + 1 > max ? max : value + 1,
      },
      () => this.invokeOnChange()
    );
  };

  public handleDown = (item: string) => () => {
    const min = 0;
    const { type } = this.state;
    const value = this.state[item];
    this.setState(
      {
        ...this.state,
        [item]: value - 1 < min ? min : value - 1,
      },
      () => this.invokeOnChange()
    );
  };

  public invokeOnChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      const { hour, minute, type } = this.state;
      onChange(hour, minute, type);
    }
  };

  public render() {
    const { type, hour, minute } = this.state;
    return (
      <div className="time__container">
        <TimeInput
          onUp={this.handleUp('hour')}
          onDown={this.handleDown('hour')}
          onChange={this.handleChange('hour')}
          value={hour}
        />
        <div className="time__container__div">:</div>
        <TimeInput
          onUp={this.handleUp('minute')}
          onDown={this.handleDown('minute')}
          onChange={this.handleChange('minute')}
          value={minute}
        />
        <div className="time__container__type">
          <TimeType value="AM" checkValue={type} label="AM" onChange={this.handleTypeChange} />
          <TimeType value="PM" checkValue={type} label="PM" onChange={this.handleTypeChange} />
          <TimeType value="ALL" checkValue={type} label="AM/PM" onChange={this.handleTypeChange} />
        </div>
      </div>
    );
  }
}

export default TimeContainer;
