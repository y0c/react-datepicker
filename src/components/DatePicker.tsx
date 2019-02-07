import * as moment from 'moment';
import * as React from 'react';
import * as classNames from 'classnames';
import Calendar, { Props as ICalendarProps } from './Calendar';
import TimeContainer from './TimeContainer';
import { Omit, Merge } from '../utils/tsUtils';
import { getNormalHour, getMomentHour } from '../utils/DateUtil';
import PickerInput, { Props as InputProps } from './PickerInput';

export enum TabValue {
  DATE,
  TIME,
}

interface DatePickerProps {
  /** To display input format (moment format) */
  inputFormat: string;
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
}

export interface State {
  show: boolean;
  tabValue: TabValue;
  value: moment.Moment;
  inputValue: string;
  selected: moment.Moment[];
  position: {
    top: string;
    left: string;
  };
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
    locale: 'en-ca',
    inputFormat: 'YYYY-MM-DD',
    showDefaultIcon: false,
  };

  public state: State = {
    show: false,
    tabValue: TabValue.DATE,
    value: moment(this.props.initialDate),
    inputValue: this.setValueToInput(moment(this.props.initialDate)),
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
    const inputValue = this.setValueToInput(date);

    if (onChange) {
      onChange(inputValue, date);
    }

    this.setState({
      ...this.state,
      inputValue,
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
    const inputValue = this.setValueToInput(date);

    if (onChange) {
      onChange(inputValue, date);
    }
    this.setState({
      ...this.state,
      inputValue,
      value: date,
    });
  };

  public hideCalendar = (e: React.MouseEvent) => {
    this.setState({
      ...this.state,
      show: false,
    });
  };

  public setValueToInput(value: moment.Moment) {
    const { includeTime, inputFormat, locale = 'en-ca' } = this.props;
    let inputValue: string;
    if (!includeTime) {
      inputValue = value.format(inputFormat);
    } else {
      inputValue = value.locale(locale).format(`${inputFormat} hh:mm A`);
    }
    return inputValue;
  }

  public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.currentTarget.value;

    if (onChange) {
      onChange(value, undefined);
    }

    this.setState({
      ...this.state,
      inputValue: e.currentTarget.value,
    });
  };

  public handleClear = () => {
    const { onChange } = this.props;

    if (onChange) {
      onChange('', undefined);
    }

    this.setState({
      ...this.state,
      inputValue: '',
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
      onClear: this.handleClear,
      value: inputValue,
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
    const { tabValue, selected, value } = this.state;
    if (tabValue === TabValue.DATE) {
      return (
        <Calendar
          {...this.props}
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
          type={value.hour() > 11 ? 'PM' : 'AM'}
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
