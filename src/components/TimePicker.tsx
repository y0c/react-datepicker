import * as React from 'react';
import { lpad } from '../utils/StringUtil';
import TimeContainer from './TimeContainer';

interface Props {
  /** Timepicker change event */
  onChange?: (hour: number, minute: number, type: string) => void;
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

  public hideTimeContainer = () => {
    this.setState({
      ...this.state,
      timeShow: false,
    });
  };

  public render() {
    const {
      timeShow,
      position: { top, left },
      inputValue,
    } = this.state;
    return (
      <div className="timepicker">
        <div className="timepicker__input" onClick={this.handleTimeContainer} ref={this.inputRef}>
          <input type="text" value={inputValue} onChange={this.handleInputChange} />
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
