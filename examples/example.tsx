import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Calendar from '../src/Calendar';
import './example.css';

ReactDOM.render(<Calendar
  customDayClass={ date => {
    const classMap = {
      "20181201": "calendar__day--custom1"
    }

    return classMap[date.format('YYYYMMDD')];
  }}
/>, document.getElementById('root'));