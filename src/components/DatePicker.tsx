import * as moment from 'moment';
import * as React from 'react';
import Calendar, { Props as ICalendarProps } from './Calendar';
import { Merge } from '../utils/tsUtils';

interface InputProps {
  value: string;
}

export interface Props {
  /** To display input format (moment format) */
  inputFormat: string;
  /** Override InputComponent */
  inputComponent?: (props: InputProps) => JSX.Element;
  /** Props for Calendar component */
  calendarProps: Merge<
    ICalendarProps,
    {
      base?: moment.Moment;
      showMonthCnt?: number;
    }
  >;
}

export interface State {
  inputValue: string;
  calendarShow: boolean;
  selected: moment.Moment[];
  position: {
    top: string;
    left: string;
  };
}

class DatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    calendarProps: {
      base: moment(),
      showMonthCnt: 1,
      locale: 'en-ca',
    },
    inputFormat: 'YYYY-MM-DD',
  };

  public state = {
    calendarShow: false,
    inputValue: '',
    position: {
      left: '',
      top: '',
    },
    selected: [],
  };

  public inputRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
  }

  public handleCalendar = (e: React.MouseEvent) => {
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
      calendarShow: true,
      position: {
        left: `${left}px`,
        top: `${top + height + 5}px`,
      },
    });
  };

  public handleChange = (date: moment.Moment) => {
    const {
      calendarProps: { onChange },
      inputFormat,
    } = this.props;

    if (onChange) {
      onChange(date);
    }

    this.setState({
      calendarShow: false,
      inputValue: date.format(inputFormat),
      selected: [date],
    });
  };

  public hideCalendar = (e: React.MouseEvent) => {
    this.setState({
      ...this.state,
      calendarShow: false,
    });
  };

  public renderInputComponent = (): JSX.Element => {
    const { inputComponent } = this.props;
    const { inputValue } = this.state;

    let component: JSX.Element;
    if (inputComponent) {
      component = inputComponent({ value: inputValue });
    } else {
      component = <input type="text" value={inputValue} readOnly={true} />;
    }
    return component;
  };

  public render() {
    const {
      calendarShow,
      selected,
      position: { top, left },
    } = this.state;

    return (
      <div className="datepicker">
        <div className="datepicker__input" onClick={this.handleCalendar} ref={this.inputRef}>
          {this.renderInputComponent()}
        </div>
        <div className="datepicker__container" style={{ top, left }}>
          <Calendar
            {...this.props.calendarProps}
            show={calendarShow}
            onChange={this.handleChange}
            selected={selected}
          />
        </div>
        {calendarShow && <div className="datepicker__backdrop" onClick={this.hideCalendar} />}
      </div>
    );
  }
}

export default DatePicker;
