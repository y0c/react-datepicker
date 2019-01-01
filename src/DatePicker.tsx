import * as React from 'react';
import * as moment from 'moment';
import Calendar from './Calendar';


interface Props {
  onChange?: (date: moment.Moment) => void
  inputFormat: string
}

interface State {
  inputValue: string
  calendarShow: boolean
  selected: moment.Moment[]
}

class DatePicker extends React.Component<Props, State> {

  static defaultProps = {
    inputFormat: 'YYYY-MM-DD'
  }

  state = {
    inputValue: '',
    calendarShow: false,
    selected: []
  }

  private inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    const node = this.inputRef.current;

    if(node) {
      node.addEventListener('click', this.handleCalendar);
    }
  }

  handleCalendar = () => {
    this.setState({
      calendarShow: true
    })
  }

  handleChange = (date:moment.Moment) => {
    const { onChange, inputFormat } = this.props;

    if(onChange) 
      onChange(date);

    this.setState({
      inputValue: date.format(inputFormat),
      calendarShow: false,
      selected: [date]
    });
  }

  hideCalendar = () => {
    this.setState({
      ...this.state,
      calendarShow: false
    });
  }
 
  render() {
    const { inputValue, calendarShow, selected } = this.state;
    
    return (
      <div className="datepicker">
        <input 
          ref={this.inputRef}
          className="datepicker__input" 
          value={inputValue}
          type="text" 
        />
        <div className="datepicker__container">
          <Calendar
            show={calendarShow}
            onChange={this.handleChange}
            selected={selected}
          /> 
        </div>
        {
          calendarShow && (
            <div className="datepicker__backdrop" onClick={this.hideCalendar}></div>
          )
        }
      </div>
    )
  }
}

export default DatePicker;