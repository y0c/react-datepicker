import * as React from 'react';
import TimeInput from './TimeInput';
import { IDatePicker } from '../common/@types';

interface Props {
  /** hour to display */
  hour?: number;
  /** minute to display */
  minute?: number;
  /** timetype(AM/PM) to display */
  type?: IDatePicker.TimeType;
  /** hour, minute, type change event */
  onChange?: (hour: number, minute: number, type: IDatePicker.TimeType) => void;
}

interface State {
  hour: number;
  minute: number;
  type: IDatePicker.TimeType;
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
    type: this.props.type || IDatePicker.TimeType.AM,
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
        type:
          e.currentTarget.value === IDatePicker.TimeType.AM
            ? IDatePicker.TimeType.AM
            : IDatePicker.TimeType.PM,
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
          <TimeType
            value={IDatePicker.TimeType.AM}
            checkValue={type}
            label={IDatePicker.TimeType.AM}
            onChange={this.handleTypeChange}
          />
          <TimeType
            value={IDatePicker.TimeType.PM}
            checkValue={type}
            label={IDatePicker.TimeType.PM}
            onChange={this.handleTypeChange}
          />
        </div>
      </div>
    );
  }
}

export default TimeContainer;
