import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { CalendarEnums } from '../common/@enum';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import { Props as DayViewProps } from './DayView';

interface CalendarContainerProps {
  locale?: string;
  show?: boolean;
  prevIcon?: boolean;
  nextIcon?: boolean;
  onChange?: (date: moment.Moment) => void;
}

interface PrivateProps {
  current: moment.Moment;
  onPrev?: () => void;
  onNext?: () => void;
  setDate: (type: 'year' | 'month', value: number) => void;
}

interface State {
  viewMode: CalendarEnums.ViewMode;
}

export type InheritProps = DayViewProps & CalendarContainerProps;
type Props = CalendarContainerProps & DayViewProps & PrivateProps;

class CalendarContainer extends React.Component<Props, State> {
  public static defaultProps = {
    current: moment(),
    show: true,
  };

  public state = {
    viewMode: CalendarEnums.ViewMode.DAY,
  };

  constructor(props: Props) {
    super(props);
    if (props.locale) {
      require(`moment/locale/${props.locale}`);
      moment.locale(props.locale);
    }
  }

  public getHeaderTitle = () => {
    const { current } = this.props;
    const year = current.year();
    return {
      [CalendarEnums.ViewMode.YEAR]: `${year - 4} - ${year + 5}`,
      [CalendarEnums.ViewMode.MONTH]: `${year}`,
      [CalendarEnums.ViewMode.DAY]: current.format('MMMM YYYY'),
    }[this.state.viewMode];
  };

  public handleTitleClick = () => {
    const { viewMode } = this.state;
    let changedMode: CalendarEnums.ViewMode = viewMode;

    if (viewMode === CalendarEnums.ViewMode.MONTH) {
      changedMode = CalendarEnums.ViewMode.YEAR;
    } else if (viewMode === CalendarEnums.ViewMode.DAY) {
      changedMode = CalendarEnums.ViewMode.MONTH;
    }
    this.setState({
      viewMode: changedMode,
    });
  };

  public handleChange = (value: string) => {
    const { viewMode } = this.state;
    const { current, onChange, setDate } = this.props;
    if (viewMode === CalendarEnums.ViewMode.YEAR) {
      setDate('year', parseInt(value, 10));
      this.setState({
        viewMode: CalendarEnums.ViewMode.MONTH,
      });
    } else if (viewMode === CalendarEnums.ViewMode.MONTH) {
      const month = moment()
        .month(value)
        .format('M');
      setDate('month', parseInt(month, 10) - 1);
      this.setState({
        viewMode: CalendarEnums.ViewMode.DAY,
      });
    } else {
      const date = current.date(parseInt(value, 10));
      if (onChange) onChange(date);
    }
  };

  public render() {
    const {
      customDayClass,
      customDayText,
      selected,
      onChange,
      startDay,
      endDay,
      prevIcon,
      nextIcon,
      onPrev,
      onNext,
      show,
      current,
    } = this.props;

    const calendarClass = classNames('calendar__container', {
      'calendar--show': show,
    });

    return (
      <div className={calendarClass}>
        <CalendarHead
          onPrev={onPrev}
          onNext={onNext}
          prevIcon={prevIcon}
          nextIcon={nextIcon}
          onTitleClick={this.handleTitleClick}
          title={this.getHeaderTitle()}
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
        />
      </div>
    );
  }
}

export default CalendarContainer;
