import * as React from 'react';
import * as moment from 'moment';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import 'moment/locale/ko';
import '../assets/styles/calendar.scss';

moment.locale('ko');

interface Props {
  headerFormat?: string
}

interface State {
  current: moment.Moment
}

class Calendar extends React.Component<Props, State>{

  public static defaultProps = {
    headerFormat: "YYYY년 MM월"
  }

  constructor(props: Props){
    super(props);
    this.state = {
      current: moment() 
    };
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
      headerFormat
    } = this.props;

    const {
      current
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
        />
      </div>
    )
  }
}

export default Calendar;
