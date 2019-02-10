import * as moment from 'moment';
import * as React from 'react';
import * as classNames from 'classnames';
import Calendar, { Props as ICalendarProps } from './Calendar';
import TimeContainer from './TimeContainer';
import { Omit, Merge } from '../utils/TypeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import { getDivPosition } from '../utils/DOMUtil';
import { IDatePicker } from '../common/@types';
import { DatePickerDefaults } from '../common/Constant';
import { getNormalHour, getMomentHour } from '../utils/DateUtil';
import PickerInput, { Props as InputProps } from './PickerInput';
import Backdrop from './Backdrop';

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
  /** DatePicker portal version */
  portal: boolean;
  /** Override InputComponent */
  inputComponent?: (props: InputProps) => JSX.Element;
  /** DatePicker value change Event */
  onChange?: (rawValue: string, date?: moment.Moment) => void;
  /** DatePicker Input default Icon */
  showDefaultIcon: boolean;
}

export interface State {
  show: boolean;
  tabValue: TabValue;
  date: moment.Moment;
  dateValue: string;
  timeValue: string;
  selected: moment.Moment[];
  position: IDatePicker.Position;
}

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    showMonthCnt?: number;
  }
>;

export type Props = DatePickerProps & Omit<InputProps, 'onChange'> & CalendarProps;
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

  public state: State = {
    show: false,
    tabValue: TabValue.DATE,
    date: moment(this.props.initialDate),
    dateValue: this.setValueToInput(moment(this.props.initialDate)),
    timeValue: '',
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
    const { disabled } = this.props;
    if (disabled) return;
    this.setState({
      show: true,
      position: getDivPosition(this.inputRef.current),
    });
  };

  public handleDateChange = (date: moment.Moment) => {
    const { onChange } = this.props;
    const dateValue = this.setValueToInput(date);

    ifExistCall(onChange, dateValue, date);

    this.setState({
      ...this.state,
      date,
      dateValue,
      show: false,
      selected: [date],
    });
  };

  public handleTimeChange = (hour: number, minute: number, type: string) => {
    const { onChange } = this.props;
    let date = this.state.date;
    date = date
      .clone()
      .hour(getMomentHour(hour, type))
      .minute(minute);
    const dateValue = this.setValueToInput(date);

    ifExistCall(onChange, dateValue, date);

    this.setState({
      ...this.state,
      date,
      dateValue,
    });
  };

  public hideCalendar = () => {
    this.setState({
      ...this.state,
      show: false,
    });
  };

  public setValueToInput(value: moment.Moment) {
    const { includeTime, dateFormat, locale = DatePickerDefaults.locale } = this.props;
    let inputValue: string;
    if (!includeTime) {
      inputValue = value.format(dateFormat);
    } else {
      inputValue = value.locale(locale).format(`${dateFormat} hh:mm A`);
    }
    return inputValue;
  }

  public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.currentTarget.value;

    ifExistCall(onChange, value, undefined);

    this.setState({
      ...this.state,
      dateValue: e.currentTarget.value,
    });
  };

  public handleInputClear = () => {
    const { onChange } = this.props;

    ifExistCall(onChange, '', undefined);

    this.setState({
      ...this.state,
      dateValue: '',
    });
  };

  public handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { date } = this.state;
    const { dateFormat } = this.props;
    const value = e.currentTarget.value;
    const parsedDate = moment(value, DatePickerDefaults.dateFormat);
    let updateDate: moment.Moment | undefined;
    updateDate = date;
    if (parsedDate.isValid() && dateFormat.length === value.length) {
      updateDate = parsedDate;
    }

    this.setState({
      ...this.state,
      date: updateDate,
      dateValue: updateDate.format(dateFormat),
    });
  };

  public renderInputComponent = (): JSX.Element => {
    const { inputComponent, readOnly, disabled, clear, autoFocus, showDefaultIcon } = this.props;
    const { dateValue } = this.state;
    const inputProps = {
      readOnly,
      autoFocus,
      disabled,
      clear,
      onChange: this.handleInputChange,
      onClear: this.handleInputClear,
      onBlur: this.handleInputBlur,
      value: dateValue,
      icon: showDefaultIcon ? <i className="icon icon-calendar" /> : undefined,
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
    const { tabValue, selected, date } = this.state;
    if (tabValue === TabValue.DATE) {
      return (
        <Calendar
          {...this.props}
          base={date}
          onChange={this.handleDateChange}
          selected={selected}
        />
      );
    }
    return null;
  };

  public renderTime = (): JSX.Element | null => {
    const { tabValue, date } = this.state;
    const hour = getNormalHour(date.hour());

    if (tabValue === TabValue.TIME) {
      return (
        <TimeContainer
          hour={hour}
          minute={date.minute()}
          type={date.hour() > 11 ? 'PM' : 'AM'}
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
    const { includeTime, portal } = this.props;
    let position;
    if (!portal) {
      position = { top, left };
    }

    return (
      <div className="datepicker">
        <div className="datepicker__input" onClick={this.handleCalendar} ref={this.inputRef}>
          {this.renderInputComponent()}
        </div>
        {show && (
          <div
            className={classNames('datepicker__container', {
              portal,
              include__time: includeTime,
            })}
            style={{ ...position }}
          >
            {this.renderTabMenu()}
            {this.renderCalendar()}
            {this.renderTime()}
          </div>
        )}
        <Backdrop show={show} invert={portal} onClick={this.hideCalendar} />
      </div>
    );
  }
}

export default DatePicker;
