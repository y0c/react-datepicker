import * as React from 'react';
import TimeInput from './TimeInput';
import { ifExistCall } from '../utils/FunctionUtil';

interface Props {
  /** hour to display */
  hour?: number;
  /** minute to display */
  minute?: number;
  /** hour, minute, type change event */
  onChange?: (hour: number, minute: number) => void;
  /** hour, minute blur event */
  onBlur?: (hour: number, minute: number) => void;
}

interface State {
  hour: number;
  minute: number;
}

class TimeContainer extends React.Component<Props, State> {
  public state = {
    hour: this.props.hour || 0,
    minute: this.props.minute || 0,
  };

  public handleChange = (item: string) => (e: React.FormEvent<HTMLInputElement>) => {
    const min = 0;
    const max = item === 'hour' ? 23 : 59;
    let value = parseInt(e.currentTarget.value, 10);

    if (isNaN(value)) {
      value = 0;
    }

    if (max < value) {
      value = max;
    }

    if (min > value) {
      value = min;
    }

    this.setState(
      {
        ...this.state,
        [item]: value,
      },
      () => this.invokeOnChange()
    );
  };

  public handleUp = (item: string) => () => {
    const max = item === 'hour' ? 23 : 59;

    const value = this.state[item];

    this.setState(
      {
        ...this.state,
        [item]: Math.min(value + 1, max),
      },
      () => this.invokeOnChange()
    );
  };

  public handleDown = (item: string) => () => {
    const min = 0;
    const value = this.state[item];
    this.setState(
      {
        ...this.state,
        [item]: Math.max(value - 1, min),
      },
      () => this.invokeOnChange()
    );
  };

  public handleBlur = () => {
    const { onBlur } = this.props;
    const { hour, minute } = this.state;
    ifExistCall(onBlur, hour, minute);
  };

  public invokeOnChange = () => {
    const { onChange } = this.props;
    const { hour, minute } = this.state;
    ifExistCall(onChange, hour, minute);
  };

  public render() {
    const { hour, minute } = this.state;
    return (
      <div className="time__container">
        <TimeInput
          onUp={this.handleUp('hour')}
          onDown={this.handleDown('hour')}
          onChange={this.handleChange('hour')}
          onBlur={this.handleBlur}
          value={hour}
        />
        <div className="time__container__div">:</div>
        <TimeInput
          onUp={this.handleUp('minute')}
          onDown={this.handleDown('minute')}
          onChange={this.handleChange('minute')}
          onBlur={this.handleBlur}
          value={minute}
        />
      </div>
    );
  }
}

export default TimeContainer;
