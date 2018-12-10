import * as React from 'react';
import * as moment from 'moment';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import 'moment/locale/ko';
import '../assets/styles/calendar.scss';

moment.locale('ko');

interface Props {
  headerFormat?: string
  multiSelect?: boolean
  onSelect?: (selected: moment.Moment[]) => void
  customDayClass?: (date: moment.Moment) => string | string[]
  customDayText?: (date: moment.Moment) => string
}

interface State {
  current: moment.Moment
  selected: moment.Moment[]
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
      selected: []
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

  handleSelect = (value: moment.Moment) => {
    const {
      multiSelect,
      onSelect
    } = this.props;
    const selected = !multiSelect ? 
        [value] : 
        this.state.selected.concat([value]);

    if(onSelect !== undefined){
      onSelect(selected);
    }

    this.setState({
      ...this.state,
      selected
    });
  }



  render() {
    const {
      headerFormat,
      customDayClass,
      customDayText
    } = this.props;

    const {
      current,
      selected
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
          onSelect={this.handleSelect}
          customDayClass={customDayClass}
          customDayText={customDayText}
        />
      </div>
    )
  }
}

export default Calendar;
