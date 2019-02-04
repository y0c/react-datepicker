import * as React from 'react';
import TimeInput from './TimeInput';

interface Props {
  hour?: number;
  minute?: number;
  type?: string;
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
    hour: this.props.hour || 1,
    minute: this.props.minute || 0,
    type: this.props.type || 'AM',
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
        hour: 1,
        type: e.currentTarget.value,
      },
      () => this.invokeOnChange()
    );
  };

  public handleUp = (item: string) => () => {
    const min = item === 'hour' ? 1 : 0;
    const max = item === 'hour' ? 12 : 60;

    const value = this.state[item];

    this.setState(
      {
        ...this.state,
        [item]: value + 1 > max ? min : value + 1,
      },
      () => this.invokeOnChange()
    );
  };

  public handleDown = (item: string) => () => {
    const min = item === 'hour' ? 1 : 0;
    const max = item === 'hour' ? 12 : 60;
    const value = this.state[item];
    this.setState(
      {
        ...this.state,
        [item]: value - 1 < min ? max : value - 1,
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
        </div>
      </div>
    );
  }
}

export default TimeContainer;
