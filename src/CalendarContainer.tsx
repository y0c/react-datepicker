import * as React from 'react';
import * as moment from 'moment';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import * as classNames from 'classnames';
import ViewMode from './ViewMode';
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
  viewMode: ViewMode;
}

export type InheritProps = DayViewProps & CalendarContainerProps;
type Props = CalendarContainerProps & DayViewProps & PrivateProps;

class CalendarContainer extends React.Component<Props, State> {
  public static defaultProps = {
    show: true,
    current: moment(),
  };

  public state = {
    viewMode: ViewMode.DAY,
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
      [ViewMode.YEAR]: `${year - 4} - ${year + 5}`,
      [ViewMode.MONTH]: `${year}`,
      [ViewMode.DAY]: current.format('MMMM YYYY'),
    }[this.state.viewMode];
  };

  public handleTitleClick = () => {
    const { viewMode } = this.state;
    let changedMode: ViewMode = viewMode;

    if (viewMode === ViewMode.MONTH) {
      changedMode = ViewMode.YEAR;
    } else if (viewMode === ViewMode.DAY) {
      changedMode = ViewMode.MONTH;
    }
    this.setState({
      viewMode: changedMode,
    });
  };

  public handleChange = (value: string) => {
    const { viewMode } = this.state;
    const { current, onChange, setDate } = this.props;
    if (viewMode == ViewMode.YEAR) {
      setDate('year', parseInt(value, 10));
      this.setState({
        viewMode: ViewMode.MONTH,
      });
    } else if (viewMode == ViewMode.MONTH) {
      const month = moment()
        .month(value)
        .format('M');
      setDate('month', parseInt(month, 10) - 1);
      this.setState({
        viewMode: ViewMode.DAY,
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
