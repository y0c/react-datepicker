import * as React from 'react';
import * as moment from 'moment';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import 'moment/locale/ko';
import '../assets/styles/calendar.scss';


interface Props {
  headerFormat?: string
  selected?: moment.Moment[]
  startDay?: moment.Moment
  endDay?: moment.Moment
  locale?: string
  onChange?: (date: moment.Moment) => void
  customDayClass?: (date: moment.Moment) => string | string[]
  customDayText?: (date: moment.Moment) => string
}

interface State {
  current: moment.Moment
}

class Calendar extends React.Component<Props, State>{

  public static defaultProps = {
    headerFormat: "YYYY년 MM월",
    multiSelect: false
  }

  constructor(props: Props){
    super(props);
    this.state = {
      current: moment(),
    };
    moment.locale(props.locale);
  }

  handlePrev = () => {
    this.setState({
      current: this.state.current.subtract(1, 'months')
    });
  }

  handleNext = () => {
    this.setState({
      current: this.state.current.add(1, 'months')
    });
  }

  render() {
    const {
      headerFormat,
      customDayClass,
      customDayText,
      selected,
      onChange,
      startDay,
      endDay
    } = this.props;

    const {
      current,
    } = this.state;


    return (
      <div className="calendar">
        <CalendarHead
          onPrev={this.handlePrev} 
          onNext={this.handleNext} 
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

export default Calendar;
