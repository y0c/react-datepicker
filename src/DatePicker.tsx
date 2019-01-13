import * as React from 'react';
import * as moment from 'moment';
import Calendar from './Calendar';


interface Props {
  onChange?: (date: moment.Moment) => void
  inputFormat: string
  showMonthCnt?: number
}

interface State {
  inputValue: string
  calendarShow: boolean
  selected: moment.Moment[]
  position: {
    top: string,
    left: string
  }
}

class DatePicker extends React.Component<Props, State> {

  static defaultProps = {
    inputFormat: 'YYYY-MM-DD',
    showMonthCnt: 1
  }
  
  private inputRef: React.RefObject<HTMLInputElement>

  state = {
    inputValue: '',
    calendarShow: false,
    selected: [],
    position: {
      top: '0px',
      left: '0px'
    }
  }

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
  }


  handleCalendar = (e: React.MouseEvent) => {
    const node = this.inputRef.current;
    this.setState({
      calendarShow: true,
      position: {
        top: `${node!.offsetTop + node!.clientHeight + 5}px`,
        left: `${node!.offsetLeft }px`
      }
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

  hideCalendar = (e: React.MouseEvent) => {
    this.setState({
      ...this.state,
      calendarShow: false
    });
  }
 
  render() {
    const { inputValue, calendarShow, selected, position: { top, left } } = this.state;
    const { showMonthCnt } = this.props;
    
    return (
      <div className="datepicker">
        <input 
          onClick={e => this.handleCalendar(e)}
          ref={this.inputRef}
          className="datepicker__input" 
          value={inputValue}
          readOnly
          type="text" 
        />
        <div className="datepicker__container">
          <Calendar
            show={calendarShow}
            onChange={this.handleChange}
            selected={selected}
            showMonthCnt={showMonthCnt}
            top={top}
            left={left}
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