import Calendar from '../src/Calendar';
import * as React from 'react';
import * as moment from 'moment';

interface Props {
  
}

interface State {
  selected: moment.Moment[]
}

class RangeSelect extends React.Component<Props, State> {
  state = {
    selected: []
  }

  handleChange = (date:moment.Moment) => {
    this.setState({
      selected: [date]
    })
  }

  render() {
    return (
      <React.Fragment>
        <Calendar 
          onChange={this.handleChange}
          selected={this.state.selected}
         />
        <Calendar />
      </React.Fragment>

    )
  }

} 

export default RangeSelect;

