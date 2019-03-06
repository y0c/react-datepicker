import * as React from 'react';
import TimeContainer from './TimeContainer';
import Picker, { PickerProps, PickerAction } from './Picker';
import { Omit } from '../utils/TypeUtil';
import { isValidTime, formatTime } from '../utils/TimeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import PickerInput, { Props as InputProps } from './PickerInput';
import SVGIcon from './SVGIcon';

interface TimePickerProps {
  /** Timepicker change event */
  onChange?: (hour: number, minute: number, type: string) => void;
  /** Timepicker default time icon show or hide */
  showDefaultIcon?: boolean;
}

interface State {
  inputValue: string;
  originalValue: string;
}

type Props = TimePickerProps & Omit<InputProps, 'onChange'> & PickerProps;
class TimePicker extends React.Component<Props, State> {
  public state = {
    inputValue: formatTime(1, 0, 'AM'),
    originalValue: formatTime(1, 0, 'AM'),
  };

  public handleChange = (actions: PickerAction) => (hour: number, minute: number, type: string) => {
    const { onChange } = this.props;
    this.setState({
      ...this.state,
      inputValue: formatTime(hour, minute, type),
      originalValue: formatTime(hour, minute, type),
    });

    actions.hide();
    ifExistCall(onChange, hour, minute, type);
  };

  public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      inputValue: e.currentTarget.value,
    });
  };

  public handleInputClear = () => {
    this.setState({
      ...this.state,
      inputValue: '',
    });
  };

  public handleInputBlur = () => {
    const { inputValue } = this.state;
    if (!isValidTime(inputValue)) {
      this.setState({
        ...this.state,
        inputValue: this.state.originalValue,
      });
    } else {
      this.setState({
        ...this.state,
        originalValue: inputValue,
      });
    }
  };

  public renderInputcomponent = (): JSX.Element => {
    const { inputValue } = this.state;
    return (
      <PickerInput
        {...this.props}
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
        onClear={this.handleInputClear}
        icon={this.props.showDefaultIcon ? <SVGIcon id="time" /> : undefined}
        value={inputValue}
      />
    );
  };

  public renderTimeContainer = (actions: PickerAction): JSX.Element => {
    return <TimeContainer onChange={this.handleChange(actions)} />;
  };

  public render() {
    const { portal, direction, disabled } = this.props;
    return (
      <Picker
        portal={portal}
        disabled={disabled}
        direction={direction}
        renderTrigger={() => this.renderInputcomponent()}
        renderContents={({ actions }) => this.renderTimeContainer(actions)}
      />
    );
  }
}

export default TimePicker;
