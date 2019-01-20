import * as moment from 'moment';
import * as React from 'react';
import { Calendar } from '../src';

interface State {
  selected: moment.Moment[];
  startDay?: moment.Moment;
}

class RangeSelect extends React.Component<{}, State> {
  public state = {
    selected: [],
    startDay: undefined,
  };

  public handleChange = (date: moment.Moment) => {
    this.setState({
      startDay: date,
    });
  };

  public render() {
    return (
      <React.Fragment>
        <Calendar
          onChange={this.handleChange}
          selected={this.state.selected}
          startDay={this.state.startDay}
        />
        <Calendar />
      </React.Fragment>
    );
  }
}

export default RangeSelect;
