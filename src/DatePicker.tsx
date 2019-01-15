import * as moment from 'moment';
import * as React from 'react';
import Calendar from './Calendar';

interface Props {
  onChange?: (date: moment.Moment) => void;
  inputFormat: string;
  showMonthCnt?: number;
}

interface State {
  inputValue: string;
  calendarShow: boolean;
  selected: moment.Moment[];
  position: {
    top: string;
    left: string;
  };
}

class DatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    inputFormat: 'YYYY-MM-DD',
    showMonthCnt: 1,
  };

  public state = {
    calendarShow: false,
    inputValue: '',
    position: {
      left: '0px',
      top: '0px',
    },
    selected: [],
  };

  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
  }

  public handleCalendar = (e: React.MouseEvent) => {
    const node = this.inputRef.current;
    this.setState({
      calendarShow: true,
      position: {
        left: `${node!.offsetLeft}px`,
        top: `${node!.offsetTop + node!.clientHeight + 5}px`,
      },
    });
  };

  public handleChange = (date: moment.Moment) => {
    const { onChange, inputFormat } = this.props;

    if (onChange) {
      onChange(date);
    }

    this.setState({
      calendarShow: false,
      inputValue: date.format(inputFormat),
      selected: [date],
    });
  };

  public hideCalendar = (e: React.MouseEvent) => {
    this.setState({
      ...this.state,
      calendarShow: false,
    });
  };

  public render() {
    const {
      inputValue,
      calendarShow,
      selected,
      position: { top, left },
    } = this.state;
    const { showMonthCnt } = this.props;

    return (
      <div className="datepicker">
        <input
          onClick={this.handleCalendar}
          ref={this.inputRef}
          className="datepicker__input"
          value={inputValue}
          readOnly={true}
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
        {calendarShow && <div className="datepicker__backdrop" onClick={this.hideCalendar} />}
      </div>
    );
  }
}

export default DatePicker;
