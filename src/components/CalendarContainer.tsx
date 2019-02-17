import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { CalendarEnums } from '../common/@enum';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import { Props as DayViewProps } from './DayView';
import TodayPanel from './TodayPanel';
import { ifExistCall } from '../utils/FunctionUtil';
import { DatePickerDefaults } from '../common/Constant';

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
  onChange?: (date: moment.Moment) => void;
  /** TodayPanel show or hide */
  showToday?: boolean;
}

interface PrivateProps {
  /** CalendarContainer base prop */
  current: moment.Moment;
  /** Default Date parameter in calendar, which is the parent component */
  base: moment.Moment;
  /** Number of months to show at once */
  showMonthCnt: number;
  /** Set Calendar initial Date  */
  setBase: (base: moment.Moment) => void;
}

export interface State {
  viewMode: CalendarEnums.ViewMode;
}

export type InheritProps = DayViewProps & CalendarContainerProps;
export type Props = CalendarContainerProps & DayViewProps & PrivateProps;

class CalendarContainer extends React.Component<Props, State> {
  public static defaultProps = {
    current: moment(),
    show: true,
    showMonthCnt: 1,
    showToday: false,
    locale: DatePickerDefaults.locale,
  };

  public state = {
    viewMode: CalendarEnums.ViewMode.DAY,
  };

  constructor(props: Props) {
    super(props);
    if (props.locale) {
      require(`moment/locale/${props.locale}`);
    }
  }

  public getHeaderTitle = () => {
    const { current } = this.props;
    const year = current.year();
    return {
      [CalendarEnums.ViewMode.YEAR]: `${year - 4} - ${year + 5}`,
      [CalendarEnums.ViewMode.MONTH]: `${year}`,
      [CalendarEnums.ViewMode.DAY]: current.format('YYYY.MM'),
    }[this.state.viewMode];
  };

  public handleTitleClick = () => {
    const { viewMode } = this.state;
    const { showMonthCnt } = this.props;
    let changedMode: CalendarEnums.ViewMode = viewMode;

    if (viewMode === CalendarEnums.ViewMode.MONTH) {
      changedMode = CalendarEnums.ViewMode.YEAR;
    } else if (viewMode === CalendarEnums.ViewMode.DAY) {
      changedMode = CalendarEnums.ViewMode.MONTH;
    }
    this.setState({
      viewMode: showMonthCnt > 1 ? CalendarEnums.ViewMode.DAY : changedMode,
    });
  };

  public handleChange = (value: string) => {
    const { viewMode } = this.state;
    const { current, onChange, setBase, showMonthCnt, base } = this.props;
    if (!value.trim()) return;
    if (showMonthCnt > 1) {
      const date = current.date(parseInt(value, 10));
      ifExistCall(onChange, date);
      return;
    }

    if (viewMode === CalendarEnums.ViewMode.YEAR) {
      setBase(base.clone().year(parseInt(value, 10)));
      this.setState({
        viewMode: CalendarEnums.ViewMode.MONTH,
      });
    } else if (viewMode === CalendarEnums.ViewMode.MONTH) {
      const month = moment()
        .month(value)
        .format('M');
      setBase(base.clone().month(parseInt(month, 10) - 1));
      this.setState({
        viewMode: CalendarEnums.ViewMode.DAY,
      });
    } else {
      const date = current.date(parseInt(value, 10));
      ifExistCall(onChange, date);
    }
  };

  public handleBase = (method: string) => () => {
    const { base, setBase } = this.props;
    const { viewMode } = this.state;
    const clone = base.clone();
    if (viewMode === CalendarEnums.ViewMode.YEAR) {
      setBase(clone[method](10, 'years'));
    } else if (viewMode === CalendarEnums.ViewMode.MONTH) {
      setBase(clone[method](1, 'years'));
    } else {
      setBase(clone[method](1, 'months'));
    }
  };

  public handleToday = () => {
    const { setBase } = this.props;
    setBase(moment());
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
          <TodayPanel
            today={moment()
              .locale(locale)
              .format('LL')}
            onClick={this.handleToday}
            show={showToday}
          />
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
