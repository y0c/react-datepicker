import * as React from 'react';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as CX from 'classnames';
import Calendar, { Props as ICalendarProps } from './Calendar';
import TimeContainer from './TimeContainer';
import Picker, { PickerProps, PickerAction } from './Picker';
import { Omit, Merge } from '../utils/TypeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import { formatDate } from '../utils/DateUtil';
import { DatePickerDefaults } from '../common/Constant';
import PickerInput, { Props as InputProps } from './PickerInput';
import SVGIcon from './SVGIcon';

export enum TabValue {
  DATE,
  TIME,
}

interface DatePickerProps {
  /** To display input format (dayjs format) */
  dateFormat?: string;
  /** include TimePicker true/false */
  includeTime?: boolean;
  /** show time only */
  showTimeOnly?: boolean;
  /** Initial display date */
  initialDate?: dayjs.Dayjs;
  /** Override InputComponent */
  inputComponent?: (props: InputProps) => JSX.Element;
  /** DatePicker value change Event */
  onChange?: (date: dayjs.Dayjs, rawValue: string) => void;
  /** DatePicker Input default Icon */
  showDefaultIcon: boolean;
}

export interface State {
  tabValue: TabValue;
  date?: dayjs.Dayjs;
  inputValue: string;
  selected: dayjs.Dayjs[];
}

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    /** showMonth count at once */
    showMonthCnt?: number;
  }
>;

export type Props = DatePickerProps & Omit<InputProps, 'onChange'> & CalendarProps & PickerProps;

class DatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    includeTime: false,
    showMonthCnt: 1,
    locale: DatePickerDefaults.locale,
    portal: false,
    showDefaultIcon: false,
  };

  constructor(props: Props) {
    super(props);
    dayjs.extend(customParseFormat);
    const { initialDate, includeTime, showTimeOnly } = this.props;
    const selected = [];
    let date;

    if (initialDate) {
      date = initialDate;
      selected.push(date);
    }

    if (includeTime && showTimeOnly) {
      throw new Error('incldueTime & showTimeOnly cannot be used together');
    }

    this.state = {
      date,
      selected,
      tabValue: TabValue.DATE,
      inputValue: formatDate(date, this.getDateFormat()),
    };
  }

  public getDateFormat() {
    const { dateFormat, includeTime, showTimeOnly } = this.props;

    if (!dateFormat) {
      if (includeTime) {
        return DatePickerDefaults.dateTimeFormat;
      }
      if (showTimeOnly) {
        return DatePickerDefaults.timeFormat;
      }
      return DatePickerDefaults.dateFormat;
    }
    return dateFormat;
  }

  public handleDateChange = (date: dayjs.Dayjs) => {
    const { onChange } = this.props;
    const value = dayjs(date).format(this.getDateFormat());

    ifExistCall(onChange, date, value);

    this.setState({
      ...this.state,
      date,
      inputValue: value,
      selected: [date],
    });
  };

  public handleTimeChange = (hour: number, minute: number) => {
    const { onChange } = this.props;
    let date = this.state.date;
    let selected = this.state.selected;

    if (!date) {
      date = dayjs();
      selected = [date];
    }

    date = date.hour(hour).minute(minute);
    const inputValue = date.format(this.getDateFormat());

    ifExistCall(onChange, date, inputValue);

    this.setState({
      ...this.state,
      date,
      selected,
      inputValue,
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
    const { date } = this.state;
    const value = e.currentTarget.value;
    const parsedDate = dayjs(value, this.getDateFormat());
    let updateDate: dayjs.Dayjs | undefined;

    updateDate = date;

    if (dayjs(parsedDate).isValid()) {
      updateDate = parsedDate;
    }

    this.setState({
      ...this.state,
      date: updateDate,
      inputValue: dayjs(updateDate).format(this.getDateFormat()),
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
    const { tabValue } = this.state;

    const renderButton = (type: TabValue, label: string, icon: string) => (
      <button
        className={CX({
          active: tabValue === type,
        })}
        onClick={this.handleTab(type)}
      >
        <SVGIcon id={icon} />
        {label}
      </button>
    );
    return (
      <div className="picker__container__tab">
        {renderButton(TabValue.DATE, 'DATE', 'calendar')}
        {renderButton(TabValue.TIME, 'TIME', 'time')}
      </div>
    );
  };

  public renderCalendar = (actions: PickerAction): JSX.Element | null => {
    const { selected, date } = this.state;
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
  };

  public renderTime = (): JSX.Element | null => {
    const date = this.state.date || dayjs();

    return (
      <TimeContainer hour={date.hour()} minute={date.minute()} onChange={this.handleTimeChange} />
    );
  };

  public renderContents = (actions: PickerAction): JSX.Element => {
    const { includeTime, showTimeOnly } = this.props;
    const { tabValue } = this.state;
    let component: JSX.Element;

    component = <div className="picker__container__calonly">{this.renderCalendar(actions)}</div>;

    if (showTimeOnly) {
      component = <div className="picker__container__timeonly">{this.renderTime()}</div>;
    }

    if (includeTime) {
      component = (
        <div className="picker__container__include-time">
          {this.renderTabMenu()}
          {tabValue === TabValue.DATE ? this.renderCalendar(actions) : this.renderTime()}
        </div>
      );
    }
    return component;
  };

  public render() {
    const { includeTime, portal, direction, disabled, readOnly } = this.props;

    return (
      <Picker
        portal={portal}
        direction={direction}
        readOnly={readOnly}
        disabled={disabled}
        className={CX({ include__time: includeTime })}
        renderTrigger={() => this.renderInputComponent()}
        renderContents={({ actions }) => this.renderContents(actions)}
      />
    );
  }
}

export default DatePicker;
