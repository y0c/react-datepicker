import * as React from 'react';
import * as moment from 'moment';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import classNames from 'classnames';
import 'moment/locale/ko';

export interface InheritProps {
  headerFormat?: string
  locale?: string
  selected?: moment.Moment[]
  startDay?: moment.Moment
  endDay?: moment.Moment
  current: moment.Moment
  onChange?: (date: moment.Moment) => void
  customDayClass?: (date: moment.Moment) => string | string[]
  customDayText?: (date: moment.Moment) => string
  show?: boolean
  prevIcon?: boolean
  nextIcon?: boolean
}

interface PrivateProps {
  onPrev?: () => void
  onNext?: () => void
}

type Props = InheritProps & PrivateProps

class CalendarContainer extends React.Component<Props>{

  public static defaultProps = {
    headerFormat: "YYYY년 MM월",
    show: true,
    current: moment()
  }

  constructor(props: Props){
    super(props);
    moment.locale(props.locale);
  }


  render() {
    const {
      headerFormat,
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
      current
    } = this.props;


    const calendarClass = classNames('calendar__container', {
      'calendar--show': show
    });

    return (
      <div className={calendarClass}>
        <CalendarHead
          onPrev={onPrev} 
          onNext={onNext} 
          prevIcon={prevIcon}
          nextIcon={nextIcon}
          title={current.format(headerFormat)}
        />
        <CalendarBody
          current={current}
          selected={selected}
          startDay={startDay}
          endDay={endDay}
          onChange={onChange}
          customDayClass={customDayClass}
          customDayText={customDayText}
        />
      </div>
    )
  }
}


export default CalendarContainer;
