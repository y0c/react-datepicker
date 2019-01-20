import * as moment from 'moment';
import * as React from 'react';
import Calendar from './Calendar';

interface Props {
  base: moment.Moment;
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
    base: moment(),
    inputFormat: 'YYYY-MM-DD',
    showMonthCnt: 1,
  };

  public state = {
    calendarShow: false,
    inputValue: '',
    position: {
      left: '',
      top: '',
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
    let left = 0;
    let top = 0;
    let height = 0;

    if (node) {
      left = node.offsetLeft;
      top = node.offsetTop;
      height = node.clientHeight;
    }

    this.setState({
      calendarShow: true,
      position: {
        left: `${left}px`,
        top: `${top + height + 5}px`,
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
    const { showMonthCnt, base } = this.props;

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
            base={base}
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
