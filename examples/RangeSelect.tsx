import Calendar from '../src/Calendar';
import * as React from 'react';
import * as moment from 'moment';

interface Props {
  
}

interface State {
  selected: moment.Moment[]
  startDay: moment.Moment
}

class RangeSelect extends React.Component<Props, State> {
  state = {
    selected: [],
    startDay: moment()
  }

  handleChange = (date:moment.Moment) => {
    this.setState({
      startDay: date
    })
  }

  render() {
    return (
      <React.Fragment>
        <Calendar 
          onChange={this.handleChange}
          selected={this.state.selected}
          startDay={this.state.startDay}
         />
        <Calendar />
      </React.Fragment>

    )
  }

} 

export default RangeSelect;

