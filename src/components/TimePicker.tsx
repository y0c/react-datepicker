import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import TimeContainer from './TimeContainer';
import { IDatePicker } from '../common/@types';
import { Omit } from '../utils/TypeUtil';
import { isValidTime, formatTime } from '../utils/TimeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import { getDivPosition, getDomHeight } from '../utils/DOMUtil';
import PickerInput, { Props as InputProps } from './PickerInput';
import Backdrop from './Backdrop';
import SVGIcon from './SVGIcon';

interface TimePickerProps {
  /** Timepicker change event */
  onChange?: (hour: number, minute: number, type: string) => void;
  /** Timepicker default time icon show or hide */
  showDefaultIcon?: boolean;
  /** Timepicker portal version */
  portal?: boolean;
  /** DatePicker show direction (0 = TOP , 1 = BOTTOM) */
  direction?: IDatePicker.PickerDirection;
}

interface State {
  timeShow: boolean;
  inputValue: string;
  originalValue: string;
  position: IDatePicker.Position;
}

type Props = TimePickerProps & Omit<InputProps, 'onChange'>;
class TimePicker extends React.Component<Props, State> {
  public state = {
    timeShow: false,
    inputValue: formatTime(1, 0, 'AM'),
    originalValue: formatTime(1, 0, 'AM'),
    position: {
      left: '',
      top: '',
    },
  };

  public inputRef: React.RefObject<HTMLDivElement>;
  public containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
    this.containerRef = React.createRef();
  }

  public handleTimeContainer = (e: React.MouseEvent) => {
    const { disabled, direction } = this.props;
    if (disabled) {
      return;
    }
    this.setState(
      {
        timeShow: true,
      },
      () => {
        this.setState({
          position: getDivPosition(
            this.inputRef.current,
            direction,
            getDomHeight(this.containerRef.current)
          ),
        });
      }
    );
  };

  public handleChange = (hour: number, minute: number, type: string) => {
    const { onChange } = this.props;
    this.setState({
      ...this.state,
      inputValue: formatTime(hour, minute, type),
      originalValue: formatTime(hour, minute, type),
    });

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
        inputValue: this.state.originalValue,
      });
    }
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
        onBlur={this.handleInputBlur}
        onClear={this.handleInputClear}
        icon={this.props.showDefaultIcon ? <SVGIcon id="time" /> : undefined}
        value={inputValue}
      />
    );
  };

  public render() {
    const { timeShow } = this.state;
    const { portal } = this.props;
    let position;
    if (!portal) {
      position = this.state.position;
    }
    return (
      <div className="timepicker">
        <div className="timepicker__input" onClick={this.handleTimeContainer} ref={this.inputRef}>
          {this.renderInputcomponent()}
        </div>
        <div
          className={classNames('timepicker__container', { portal })}
          role="dialog"
          aria-modal="true"
          style={{ ...position, display: timeShow ? 'block' : 'none' }}
          ref={this.containerRef}
        >
          <TimeContainer onChange={this.handleChange} />
        </div>
        <Backdrop show={timeShow} invert={portal} onClick={this.hideTimeContainer} />
      </div>
    );
  }
}

export default TimePicker;
