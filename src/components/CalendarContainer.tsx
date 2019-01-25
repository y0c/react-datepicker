import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { CalendarEnums } from '../common/@enum';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import { Props as DayViewProps } from './DayView';
import TodayPanel from './TodayPanel';

interface CalendarContainerProps {
  locale?: string;
  show?: boolean;
  prevIcon?: boolean;
  nextIcon?: boolean;
  onChange?: (date: moment.Moment) => void;
  showToday?: boolean;
}

interface PrivateProps {
  current: moment.Moment;
  base: moment.Moment;
  showMonthCnt: number;
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
    showToday: true,
    locale: 'en-ca',
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
    const { current, onChange, setBase, showMonthCnt = 1, base } = this.props;
    if (!value.trim()) return;
    if (showMonthCnt > 1) {
      const date = current.date(parseInt(value, 10));
      if (onChange) onChange(date);
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
      if (onChange) onChange(date);
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
      selected,
      showToday,
      startDay,
      endDay,
      prevIcon,
      nextIcon,
      show,
      current,
      locale = 'en-ca',
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
        <TodayPanel
          today={moment()
            .locale(locale)
            .format('LL')}
          onClick={this.handleToday}
          show={showToday}
        />
        <CalendarBody
          viewMode={this.state.viewMode}
          current={current}
          selected={selected}
          startDay={startDay}
          endDay={endDay}
          onClick={this.handleChange}
          customDayClass={customDayClass}
          customDayText={customDayText}
          locale={locale}
        />
      </div>
    );
  }
}

export default CalendarContainer;
