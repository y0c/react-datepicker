import * as React from 'react';
import * as moment from 'moment';
import { getDayMatrix } from './util/DateUtil';
import Day from './Day';

interface Props{
  current: moment.Moment 
}
const getDayClass = (value: moment.Moment) => {
  const yyyyMMdd = 'YYYYMMDD';
  if(value.format(yyyyMMdd) == moment().format(yyyyMMdd)) {
    return 'today';
  }
  return ''; 
}

const CalendarBody: React.SFC<Props> = ({
  current
}) => {
  
  const dayMatrix = getDayMatrix(current.year(), current.month());
  const weekdays = moment.weekdaysShort();

  return (
  <div className="calendar__body">
    <table className="calendar__body--table">
      <thead>
        <tr>
          {
            weekdays.map((v,i) => <th key={i}>{v}</th>)
          }
        </tr>
      </thead> 
      <tbody>
        {
          dayMatrix.map((row,i) => (
            <tr key={i}>
              {
                row.map((col,j) => (
                  <Day 
                    customClass={getDayClass(moment([current.year(), current.month(), col]))}
                    value={col} 
                    key={i+j}
                  />
                ))     
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  )
} 

export default CalendarBody;