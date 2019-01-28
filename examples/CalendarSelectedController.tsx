import * as React from 'react';
import * as moment from 'moment';
import Calendar from '../src/components/Calendar';

interface Props {
  multiple?: boolean;
}

interface State {
  selected: moment.Moment[];
}
class CalendarSelectedController extends React.Component<Props, State> {
  public static defaultProps = {
    multiple: false,
  };

  public state = {
    selected: [],
  };

  public handleChange = (date: moment.Moment) => {
    const { multiple } = this.props;
    this.setState({
      selected: multiple ? [...this.state.selected, date] : [date],
    });
  };

  public handleClear = () => {
    this.setState({
      selected: [],
    });
  };

  public render() {
    const { selected } = this.state;
    return (
      <div>
        <Calendar selected={selected} onChange={this.handleChange} />
        {this.props.multiple && <button onClick={this.handleClear}>Clear</button>}
      </div>
    );
  }
}

export default CalendarSelectedController;
