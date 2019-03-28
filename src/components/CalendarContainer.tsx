import * as classNames from 'classnames';
import * as dayjs from 'dayjs';
import * as React from 'react';
import { IDatePicker } from '../common/@types';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import { Props as DayViewProps } from './DayView';
import TodayPanel from './TodayPanel';
import { ifExistCall } from '../utils/FunctionUtil';
import { DatePickerDefaults } from '../common/Constant';
import { getToday } from '../utils/LocaleUtil';

interface CalendarContainerProps {
  /** Locale to use */
  locale?: string;
  /** Calendar Show or Hide */
  show?: boolean;
  /** PrevIcon Show or Hide */
  prevIcon?: boolean;
  /** NextIcon Show or Hide */
  nextIcon?: boolean;
  /** Event for Calendar day click */
  onChange?: (date: Date) => void;
  /** TodayPanel show or hide */
  showToday?: boolean;
}

interface PrivateProps {
  /** CalendarContainer base prop */
  current: Date;
  /** Default Date parameter in calendar, which is the parent component */
  base: Date;
  /** Number of months to show at once */
  showMonthCnt: number;
  /** Set Calendar initial Date  */
  setBase: (base: Date) => void;
}

export interface State {
  viewMode: IDatePicker.ViewMode;
}

export type InheritProps = DayViewProps & CalendarContainerProps;
export type Props = CalendarContainerProps & DayViewProps & PrivateProps;

class CalendarContainer extends React.Component<Props, State> {
  public static defaultProps = {
    current: dayjs().toDate(),
    show: true,
    showMonthCnt: 1,
    showToday: false,
    locale: DatePickerDefaults.locale,
  };

  public state = {
    viewMode: IDatePicker.ViewMode.DAY,
  };

  constructor(props: Props) {
    super(props);
  }

  public getHeaderTitle = () => {
    const { current } = this.props;
    const year = dayjs(current).year();
    return {
      [IDatePicker.ViewMode.YEAR]: `${year - 4} - ${year + 5}`,
      [IDatePicker.ViewMode.MONTH]: `${year}`,
      [IDatePicker.ViewMode.DAY]: dayjs(current).format('YYYY.MM'),
    }[this.state.viewMode];
  };

  public handleTitleClick = () => {
    const { viewMode } = this.state;
    const { showMonthCnt } = this.props;
    let changedMode: IDatePicker.ViewMode = viewMode;

    if (viewMode === IDatePicker.ViewMode.MONTH) {
      changedMode = IDatePicker.ViewMode.YEAR;
    } else if (viewMode === IDatePicker.ViewMode.DAY) {
      changedMode = IDatePicker.ViewMode.MONTH;
    }
    this.setState({
      viewMode: showMonthCnt > 1 ? IDatePicker.ViewMode.DAY : changedMode,
    });
  };

  public handleChange = (value: string) => {
    const { viewMode } = this.state;
    const { current, onChange, setBase, showMonthCnt, base } = this.props;
    if (!value.trim()) return;
    if (showMonthCnt > 1) {
      const date = dayjs(current)
        .date(parseInt(value, 10))
        .toDate();
      ifExistCall(onChange, date);
      return;
    }

    if (viewMode === IDatePicker.ViewMode.YEAR) {
      setBase(
        dayjs(base)
          .year(parseInt(value, 10))
          .toDate()
      );
      this.setState({
        viewMode: IDatePicker.ViewMode.MONTH,
      });
    } else if (viewMode === IDatePicker.ViewMode.MONTH) {
      setBase(
        dayjs(base)
          .month(parseInt(value, 10))
          .toDate()
      );
      this.setState({
        viewMode: IDatePicker.ViewMode.DAY,
      });
    } else {
      const date = dayjs(current)
        .date(parseInt(value, 10))
        .toDate();
      ifExistCall(onChange, date);
    }
  };

  public handleBase = (method: string) => () => {
    const { base, setBase } = this.props;
    const { viewMode } = this.state;
    const date = dayjs(base).clone();
    if (viewMode === IDatePicker.ViewMode.YEAR) {
      setBase(date[method](10, 'year').toDate());
    } else if (viewMode === IDatePicker.ViewMode.MONTH) {
      setBase(date[method](1, 'year').toDate());
    } else {
      setBase(date[method](1, 'month').toDate());
    }
  };

  public handleToday = () => {
    const { setBase } = this.props;
    setBase(dayjs().toDate());
  };

  public render() {
    const {
      customDayClass,
      customDayText,
      disableDay,
      selected,
      showToday,
      startDay,
      endDay,
      prevIcon,
      nextIcon,
      show,
      onMouseOver,
      current,
      locale = DatePickerDefaults.locale,
    } = this.props;

    const calendarClass = classNames('calendar__container', {
      'calendar--show': show,
    });

    return (
      <div className={calendarClass}>
        <CalendarHead
          onPrev={this.handleBase('subtract')}
          onNext={this.handleBase('add')}
          prevIcon={prevIcon}
          nextIcon={nextIcon}
          onTitleClick={this.handleTitleClick}
          title={this.getHeaderTitle()}
        />
        {showToday && (
          <TodayPanel today={getToday(locale)} onClick={this.handleToday} show={showToday} />
        )}
        <CalendarBody
          viewMode={this.state.viewMode}
          current={current}
          selected={selected}
          startDay={startDay}
          endDay={endDay}
          disableDay={disableDay}
          onClick={this.handleChange}
          onMouseOver={onMouseOver}
          customDayClass={customDayClass}
          customDayText={customDayText}
          locale={locale}
        />
      </div>
    );
  }
}

export default CalendarContainer;
