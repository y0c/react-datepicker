import * as moment from 'moment';
import * as React from 'react';
import { Calendar, DatePicker } from '../src';
import RangeSelect from './RangeSelect';

import '../assets/styles/calendar.scss';

interface State {
  startDay?: moment.Moment;
  endDay?: moment.Moment;
}
class ExamplePage extends React.Component<{}, State> {
  public state = {
    endDay: null,
    startDay: null,
  };

  public handleChange = date => {
    const { startDay, endDay } = this.state;
    if (!startDay) {
      this.setState({
        startDay: date,
      });
    } else {
      if (date.isAfter(startDay)) {
        this.setState({
          endDay: date,
        });
      } else {
        this.setState({
          startDay: date,
        });
      }
    }
  };

  public getDayText = date => {
    const value = date.format('YYYYMMDD');
    const { startDay, endDay } = this.state;

    const textMap = {
      '20190101': '신정',
    };
    if (startDay) textMap[startDay.format('YYYYMMDD')] = '출발일';
    if (endDay) textMap[endDay.format('YYYYMMDD')] = '도착일';

    return textMap[value];
  };

  public render() {
    const { startDay, endDay } = this.state;
    return (
      <div className="App">
        <div>
          <Calendar
            onChange={this.handleChange}
            startDay={startDay}
            endDay={endDay}
            customDayText={this.getDayText}
            showMonthCnt={3}
          />
          <Calendar />
        </div>
        <div>
          <DatePicker showMonthCnt={2} />
        </div>
      </div>
    );
  }
}

export default ExamplePage;
