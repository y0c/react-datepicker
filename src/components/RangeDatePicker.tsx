import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import { isDayAfter, isDayBefore, isDayEqual, isDayRange } from '../utils/DateUtil';
import RangePickerInput, { FieldType, InputProps } from './RangePickerInput';
import Calendar, { Props as ICalendarProps } from './Calendar';
import { Merge, Omit } from '../utils/TypeUtil';
import Backdrop from './Backdrop';
import { format } from 'path';

interface RangeDatePickerProps {
  /** To display input format (moment format) */
  inputFormat: string;
  /** Initial Calendar base date(if start date not set) */
  initialDate?: Date;
  /** Initial Start Date */
  initialStartDate?: Date;
  /** Initial End Date */
  initialEndDate?: Date;
  /** RangeDatePicker portal version */
  portal: boolean;
  /** RangeDatePicker change event */
  onChange?: (start?: moment.Moment, end?: moment.Moment) => void;
  /** start day display this prop(optional) */
  startText: string;
  /** end day display this prop(optional) */
  endText: string;
}

export interface State {
  show: boolean;
  start?: moment.Moment;
  end?: moment.Moment;
  startValue: string;
  endValue: string;
  mode?: FieldType;
  position: {
    left: string;
    top: string;
  };
}

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    showMonthCnt?: number;
  }
>;

export type Props = RangeDatePickerProps & CalendarProps & InputProps;

class RangeDatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    inputFormat: 'YYYY-MM-DD',
    portal: false,
    initialDate: new Date(),
    showMonthCnt: 2,
    startText: '',
    endText: '',
  };

  public inputRef: React.RefObject<HTMLDivElement>;

  public state: State = {
    show: false,
    startValue: '',
    endValue: '',
    position: {
      left: '',
      top: '',
    },
  };

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef<HTMLDivElement>();
  }

  public handleCalendar = (fieldType: FieldType) => {
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
      mode: fieldType,
      position: {
        left: `${left}px`,
        top: `${top + height + 5}px`,
      },
    });
  };

  public hideCalendar = () => {
    this.setState({
      ...this.state,
      show: false,
    });
  };

  public handleDateChange = (date: moment.Moment) => {
    const { onChange, inputFormat } = this.props;
    const { start, end } = this.state;
    let startDate: moment.Moment | undefined;
    let endDate: moment.Moment | undefined;

    startDate = start;
    endDate = end;

    if (!start) {
      startDate = date;
    } else {
      if (end) {
        startDate = date;
        endDate = undefined;
      } else {
        if (isDayAfter(date, start)) {
          endDate = date;
        } else {
          startDate = date;
        }
      }
    }

    if (onChange) {
      onChange(startDate, endDate);
    }

    this.setState({
      ...this.state,
      show: false,
      start: startDate,
      end: endDate,
      startValue: startDate ? startDate.format(inputFormat) : '',
      endValue: endDate ? endDate.format(inputFormat) : '',
    });
  };

  public handleInputChange = (fieldType: FieldType, value: string) => {
    const key = fieldType === FieldType.START ? 'startValue' : 'endValue';
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  public handleInputBlur = (fieldType: FieldType, value: string) => {
    const { inputFormat } = this.props;
    const { start, end } = this.state;
    const parsedDate = moment(value, inputFormat);
    let startDate: moment.Moment | undefined;
    let endDate: moment.Moment | undefined;

    if (start) {
      startDate = moment(start.format(inputFormat), inputFormat);
    }

    if (end) {
      endDate = moment(end.format(inputFormat), inputFormat);
    }

    if (parsedDate.isValid() && inputFormat.length === value.length) {
      if (fieldType === FieldType.END) {
        endDate = parsedDate;
      } else if (fieldType === FieldType.START) {
        startDate = parsedDate;
      }
    }

    if (startDate && endDate) {
      if (isDayBefore(endDate, startDate) || isDayAfter(startDate, endDate)) {
        // Swapping Date
        let temp: moment.Moment;
        temp = startDate;
        startDate = endDate;
        endDate = temp;
      }
    }

    this.setState({
      ...this.state,
      start: startDate,
      end: endDate,
      startValue: startDate ? startDate.format(inputFormat) : '',
      endValue: endDate ? endDate.format(inputFormat) : '',
    });
  };

  public handleCalendarText = (date: moment.Moment) => {
    const { startText, endText, customDayText } = this.props;
    const { start, end } = this.state;
    if (isDayEqual(start, date)) return startText;
    if (isDayEqual(end, date)) return endText;
    if (customDayText) return customDayText(date);
    return '';
  };

  public renderRangePickerInput = () => {
    const {
      startPlaceholder,
      endPlaceholder,
      readOnly,
      disabled,
      clear,
      onClear,
      onChange,
    } = this.props;
    const { startValue, endValue } = this.state;
    return (
      <RangePickerInput
        startPlaceholder={startPlaceholder}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        onClear={onClear}
        endPlaceholder={endPlaceholder}
        startValue={startValue}
        endValue={endValue}
        onClick={this.handleCalendar}
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
      />
    );
  };

  public render() {
    const { portal, showMonthCnt, initialDate } = this.props;
    const { show, position, start, end } = this.state;
    let style;
    if (!portal) {
      style = { ...position };
    }

    return (
      <div className="range-datepicker">
        <div className="datepicker__input" ref={this.inputRef}>
          {this.renderRangePickerInput()}
        </div>
        {show && (
          <div className={classNames('datepicker__container', { portal })} style={{ ...style }}>
            <Calendar
              base={start ? start : moment(initialDate)}
              startDay={start}
              endDay={end}
              showMonthCnt={showMonthCnt}
              onChange={this.handleDateChange}
              customDayText={this.handleCalendarText}
            />
          </div>
        )}
        <Backdrop show={show} invert={portal} onClick={this.hideCalendar} />
      </div>
    );
  }
}

export default RangeDatePicker;
