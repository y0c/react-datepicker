import * as React from 'react';
import { lpad } from '../utils/StringUtil';
import TimeContainer from './TimeContainer';
import { Omit } from '../utils/TypeUtil';
import PickerInput, { Props as InputProps } from './PickerInput';

interface TimePickerProps {
  /** Timepicker change event */
  onChange?: (hour: number, minute: number, type: string) => void;
  /** Timepicker default time icon show or hide */
  showDefaultIcon?: boolean;
}

interface State {
  timeShow: boolean;
  inputValue: string;
  position: {
    left: string;
    top: string;
  };
}

const inputFormat = (hour: number, minute: number, type: string) =>
  `${lpad(hour.toString(), 2)}:${lpad(minute.toString(), 2)} ${type}`;

type Props = TimePickerProps & Omit<InputProps, 'onChange'>;
class TimePicker extends React.Component<Props, State> {
  public state = {
    timeShow: false,
    inputValue: inputFormat(1, 0, 'AM'),
    position: {
      left: '',
      top: '',
    },
  };

  public inputRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
  }

  public handleTimeContainer = (e: React.MouseEvent) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    const node = this.inputRef.current;
    let left = 0;
    let top = 0;
    let height = 0;

    if (node) {
      left = node.offsetLeft;
      top = node.offsetTop;
      height = node.clientHeight;
    }

    this.setState({
      timeShow: true,
      position: {
        left: `${left}px`,
        top: `${top + height + 5}px`,
      },
    });
  };

  public handleChange = (hour: number, minute: number, type: string) => {
    const { onChange } = this.props;
    this.setState({
      ...this.state,
      inputValue: inputFormat(hour, minute, type),
    });

    if (onChange) {
      onChange(hour, minute, type);
    }
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

  public hideTimeContainer = () => {
    this.setState({
      ...this.state,
      timeShow: false,
    });
  };

  public renderInputcomponent = (): JSX.Element | null => {
    const { inputValue } = this.state;
    return (
      <PickerInput
        {...this.props}
        onChange={this.handleInputChange}
        onClear={this.handleInputClear}
        icon={this.props.showDefaultIcon ? <i className="icon icon-time" /> : undefined}
        value={inputValue}
      />
    );
  };

  public render() {
    const {
      timeShow,
      position: { top, left },
    } = this.state;
    return (
      <div className="timepicker">
        <div className="timepicker__input" onClick={this.handleTimeContainer} ref={this.inputRef}>
          {this.renderInputcomponent()}
        </div>
        <div
          className="timepicker__container"
          style={{ top, left, display: timeShow ? 'block' : 'none' }}
        >
          <TimeContainer onChange={this.handleChange} />
        </div>
        {timeShow && <div className="timepicker__backdrop" onClick={this.hideTimeContainer} />}
      </div>
    );
  }
}

export default TimePicker;
