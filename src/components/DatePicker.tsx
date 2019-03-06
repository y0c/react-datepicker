import * as moment from 'moment';
import * as React from 'react';
import * as classNames from 'classnames';
import Calendar, { Props as ICalendarProps } from './Calendar';
import TimeContainer from './TimeContainer';
import Picker, { PickerProps, PickerAction } from './Picker';
import { Omit, Merge } from '../utils/TypeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import { IDatePicker } from '../common/@types';
import { DatePickerDefaults } from '../common/Constant';
import {
  getNormalHour,
  getMomentHour,
  getTimeType,
  formatTime,
  isValidTime,
  parseTime,
} from '../utils/TimeUtil';
import PickerInput, { Props as InputProps } from './PickerInput';
import SVGIcon from './SVGIcon';

export enum TabValue {
  DATE,
  TIME,
}

interface DatePickerProps {
  /** To display input format (moment format) */
  dateFormat: string;
  /** include TimePicker true/false */
  includeTime: boolean;
  /** Initial display date */
  initialDate: Date;
  /** Override InputComponent */
  inputComponent?: (props: InputProps) => JSX.Element;
  /** DatePicker value change Event */
  onChange?: (rawValue: string, date?: moment.Moment) => void;
  /** DatePicker Input default Icon */
  showDefaultIcon: boolean;
  /** initial Hour (1-12) */
  initialHour?: number;
  /** initial Minute (0-60) */
  initialMinute?: number;
  /** initial TimeType (AM/PM) */
  initialTimeType?: IDatePicker.TimeType;
}

export interface State {
  tabValue: TabValue;
  date: moment.Moment;
  hour: number;
  minute: number;
  timeType: IDatePicker.TimeType;
  inputValue: string;
  selected: moment.Moment[];
}

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    /** showMonth count at once */
    showMonthCnt?: number;
  }
>;

export type Props = DatePickerProps & Omit<InputProps, 'onChange'> & CalendarProps & PickerProps;

const setValueToInput = (dateValue: string, timeValue: string, includeTime: boolean) => {
  if (!includeTime) {
    return dateValue;
  }
  return `${dateValue} ${timeValue}`;
};
class DatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    includeTime: false,
    initialDate: new Date(),
    showMonthCnt: 1,
    locale: DatePickerDefaults.locale,
    dateFormat: DatePickerDefaults.dateFormat,
    portal: false,
    showDefaultIcon: false,
  };

  public inputRef: React.RefObject<HTMLDivElement>;
  public containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    const date = moment(this.props.initialDate);
    const { dateFormat, includeTime } = this.props;
    const hour = this.props.initialHour || getNormalHour(date.hour());
    const minute = this.props.initialMinute || date.minute();
    const timeType = this.props.initialTimeType || getTimeType(date.hour());
    this.inputRef = React.createRef();
    this.containerRef = React.createRef();
    this.state = {
      date,
      hour,
      minute,
      timeType,
      tabValue: TabValue.DATE,
      inputValue: setValueToInput(
        date.format(dateFormat),
        formatTime(hour, minute, timeType),
        includeTime
      ),
      selected: [date],
    };
  }

  public handleDateChange = (date: moment.Moment) => {
    const { onChange, dateFormat, includeTime } = this.props;
    const { hour, minute, timeType } = this.state;
    const dateValue = date.format(dateFormat);
    const timeValue = formatTime(hour, minute, timeType);

    ifExistCall(onChange, dateValue, date);

    this.setState({
      ...this.state,
      date,
      inputValue: setValueToInput(date.format(dateFormat), timeValue, includeTime),
      selected: [date],
    });
  };

  public handleTimeChange = (hour: number, minute: number, type: IDatePicker.TimeType) => {
    const { onChange, dateFormat } = this.props;
    const timeValue = formatTime(hour, minute, type);
    let date = this.state.date;
    date = date
      .clone()
      .hour(getMomentHour(hour, type))
      .minute(minute);

    ifExistCall(onChange, timeValue, date);

    this.setState({
      ...this.state,
      date,
      hour,
      minute,
      timeType: type,
      inputValue: setValueToInput(date.format(dateFormat), timeValue, true),
    });
  };

  public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.currentTarget.value;

    ifExistCall(onChange, value, undefined);

    this.setState({
      ...this.state,
      inputValue: e.currentTarget.value,
    });
  };

  public handleInputClear = () => {
    const { onChange } = this.props;

    ifExistCall(onChange, '', undefined);

    this.setState({
      ...this.state,
      inputValue: '',
    });
  };

  public handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { date, hour, minute, timeType } = this.state;
    const { dateFormat, includeTime } = this.props;
    const value = e.currentTarget.value;
    const parsedDate = moment(value.substring(0, dateFormat.length), dateFormat);
    let updateDate: moment.Moment | undefined;
    let updateHour = hour;
    let updateMinute = minute;
    let updateTimeType = timeType;
    let timeValue = formatTime(updateHour, updateMinute, updateTimeType);

    updateDate = date;

    if (parsedDate.isValid() && dateFormat.length === value.length) {
      updateDate = parsedDate;
    }

    const inputTimeValue = value.substring(dateFormat.length + 1);
    if (includeTime && isValidTime(inputTimeValue)) {
      const parsedTime = parseTime(inputTimeValue);
      updateHour = parsedTime.hour;
      updateMinute = parsedTime.minute;
      updateTimeType = parsedTime.type;
      timeValue = formatTime(updateHour, updateMinute, updateTimeType);
      updateDate.hour(getMomentHour(updateHour, updateTimeType)).minute(updateMinute);
    }

    this.setState({
      ...this.state,
      date: updateDate,
      hour: updateHour,
      minute: updateMinute,
      timeType: updateTimeType,
      inputValue: setValueToInput(updateDate.format(dateFormat), timeValue, includeTime),
    });
  };

  public renderInputComponent = (): JSX.Element => {
    const { inputComponent, readOnly, disabled, clear, autoFocus, showDefaultIcon } = this.props;
    const { inputValue } = this.state;
    const inputProps = {
      readOnly,
      autoFocus,
      disabled,
      clear,
      onChange: this.handleInputChange,
      onClear: this.handleInputClear,
      onBlur: this.handleInputBlur,
      value: inputValue,
      icon: showDefaultIcon ? <SVGIcon id="calendar" /> : undefined,
    };
    return inputComponent ? inputComponent({ ...inputProps }) : <PickerInput {...inputProps} />;
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
        <SVGIcon id={icon} />
        {label}
      </button>
    );
    if (includeTime) {
      return (
        <div className="picker__container__tab">
          {renderButton(TabValue.DATE, 'DATE', 'calendar')}
          {renderButton(TabValue.TIME, 'TIME', 'time')}
        </div>
      );
    }
    return null;
  };

  public renderCalendar = (actions: PickerAction): JSX.Element | null => {
    const { tabValue, selected, date } = this.state;
    if (tabValue === TabValue.DATE) {
      return (
        <Calendar
          {...this.props}
          base={date}
          onChange={e => {
            this.handleDateChange(e);
            actions.hide();
          }}
          selected={selected}
        />
      );
    }
    return null;
  };

  public renderTime = (): JSX.Element | null => {
    const { tabValue, hour, minute, timeType } = this.state;

    if (tabValue === TabValue.TIME) {
      return (
        <TimeContainer
          hour={hour}
          minute={minute}
          type={timeType}
          onChange={this.handleTimeChange}
        />
      );
    }
    return null;
  };
  public render() {
    const { includeTime, portal, direction, disabled } = this.props;

    return (
      <Picker
        portal={portal}
        direction={direction}
        disabled={disabled}
        className={classNames({ include__time: includeTime })}
        renderTrigger={() => this.renderInputComponent()}
        renderContents={({ actions }) => (
          <React.Fragment>
            {this.renderTabMenu()}
            {this.renderCalendar(actions)}
            {this.renderTime()}
          </React.Fragment>
        )}
      />
    );
  }
}

export default DatePicker;
