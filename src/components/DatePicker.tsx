import * as moment from 'moment';
import * as React from 'react';
import * as classNames from 'classnames';
import Calendar, { Props as ICalendarProps } from './Calendar';
import TimeContainer from './TimeContainer';
import { Omit, Merge } from '../utils/tsUtils';
import { lpad } from '../utils/StringUtil';
import { getNormalHour, getMomentHour } from '../utils/DateUtil';

interface InputProps {
  value: string;
}
export enum TabValue {
  DATE,
  TIME,
}

export interface Props {
  /** To display input format (moment format) */
  inputFormat: string;
  /** include TimePicker true/false */
  includeTime: boolean;
  /** Initial display date */
  initialDate: Date;
  /** Override InputComponent */
  inputComponent?: (props: InputProps) => JSX.Element;
  /** DatePicker value change Event */
  onChange?: (date: moment.Moment) => void;
  /** Props for Calendar component */
  calendarProps: Merge<
    Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
    {
      showMonthCnt?: number;
    }
  >;
}

export interface State {
  show: boolean;
  tabValue: TabValue;
  value: moment.Moment;
  selected: moment.Moment[];
  position: {
    top: string;
    left: string;
  };
}

class DatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    includeTime: false,
    initialDate: new Date(),
    calendarProps: {
      showMonthCnt: 1,
      locale: 'en-ca',
    },
    inputFormat: 'YYYY-MM-DD',
  };

  public state: State = {
    show: false,
    tabValue: TabValue.DATE,
    value: moment(this.props.initialDate),
    position: {
      left: '',
      top: '',
    },
    selected: [moment(this.props.initialDate)],
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
      show: true,
      position: {
        left: `${left}px`,
        top: `${top + height + 5}px`,
      },
    });
  };

  public handleDateChange = (date: moment.Moment) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(date);
    }

    this.setState({
      ...this.state,
      show: false,
      value: date,
      selected: [date],
    });
  };

  public handleTimeChange = (hour: number, minute: number, type: string) => {
    const { onChange } = this.props;
    let date = this.state.value;
    date = date
      .clone()
      .hour(getMomentHour(hour, type))
      .minute(minute);

    if (onChange) {
      onChange(date);
    }
    this.setState({
      ...this.state,
      value: date,
    });
  };

  public hideCalendar = (e: React.MouseEvent) => {
    this.setState({
      ...this.state,
      show: false,
    });
  };

  public renderInputComponent = (): JSX.Element => {
    const { inputComponent, inputFormat, includeTime, calendarProps } = this.props;
    const { value } = this.state;
    const { locale = 'en-ca' } = calendarProps;

    let component: JSX.Element;
    let inputValue: string;
    if (!includeTime) {
      inputValue = value.format(inputFormat);
    } else {
      inputValue = value.locale(locale).format(`${inputFormat} hh:mm A`);
    }
    if (inputComponent) {
      component = inputComponent({ value: inputValue });
    } else {
      component = <input type="text" value={inputValue} readOnly={true} />;
    }
    return component;
  };

  public handleTab = (val: TabValue) => () => {
    this.setState({
      ...this.state,
      tabValue: val,
    });
  };

  public renderTabMenu = (): JSX.Element | null => {
    const { includeTime } = this.props;
    const { tabValue } = this.state;

    const renderButton = (type: TabValue, label: string, icon: string) => (
      <button
        className={classNames({
          active: tabValue === type,
        })}
        onClick={this.handleTab(type)}
      >
        <i className={icon} />
        {label}
      </button>
    );
    if (includeTime) {
      return (
        <div className="datepicker__container__tab">
          {renderButton(TabValue.DATE, 'DATE', 'icon icon-calendar')}
          {renderButton(TabValue.TIME, 'TIME', 'icon icon-time')}
        </div>
      );
    }
    return null;
  };

  public renderCalendar = (): JSX.Element | null => {
    const { tabValue, selected, value } = this.state;
    if (tabValue === TabValue.DATE) {
      return (
        <Calendar
          {...this.props.calendarProps}
          base={value}
          onChange={this.handleDateChange}
          selected={selected}
        />
      );
    }
    return null;
  };

  public renderTime = (): JSX.Element | null => {
    const { tabValue, value } = this.state;
    const hour = getNormalHour(value.hour());

    if (tabValue === TabValue.TIME) {
      return (
        <TimeContainer
          hour={hour}
          minute={value.minute()}
          type={value.format('A')}
          onChange={this.handleTimeChange}
        />
      );
    }
    return null;
  };
  public render() {
    const {
      show,
      position: { top, left },
    } = this.state;
    const { includeTime } = this.props;

    return (
      <div className="datepicker">
        <div className="datepicker__input" onClick={this.handleCalendar} ref={this.inputRef}>
          {this.renderInputComponent()}
        </div>
        {show && (
          <div
            className={classNames('datepicker__container', {
              include__time: includeTime,
            })}
            style={{ top, left }}
          >
            {this.renderTabMenu()}
            {this.renderCalendar()}
            {this.renderTime()}
          </div>
        )}
        {show && <div className="datepicker__backdrop" onClick={this.hideCalendar} />}
      </div>
    );
  }
}

export default DatePicker;
