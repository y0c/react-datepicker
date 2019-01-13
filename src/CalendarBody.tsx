import * as React from 'react';
import * as moment from 'moment';
import { getDayMatrix, isDayEqual } from './util/DateUtil';
import Day from './Day';

interface Props{
  current: moment.Moment
  selected?: moment.Moment[]
  startDay?: moment.Moment
  endDay?: moment.Moment
  onChange?: (date: moment.Moment) => void
  customDayClass?: (date: moment.Moment) => string | string[]
  customDayText?: (date: moment.Moment) => string
}
class CalendarBody extends React.Component<Props> {
  
  constructor(props:Props){
    super(props);
  }
  getCustomClass = (date: string):string => {
    const { current, customDayClass } = this.props;
    const currentDate = moment(current).date(parseInt(date));
    let classArr:string[] = [];
    
    if(!date.trim()) return '';

    classArr.push(`calendar__day--${currentDate.day()}`);

    if( customDayClass !== undefined ) {
      const customClass = customDayClass(currentDate);
      classArr = classArr.concat(typeof(customClass) === 'string' ? 
        [customClass]: customClass);
    }

    return classArr.join(' '); 
  }

  getCustomText = (date: string):string => {
    const { current, customDayText, startDay, endDay} = this.props;
    const currentDate = moment(current).date(parseInt(date));
    if(!date.trim()) return '';
    if(!customDayText) return '';

    return customDayText(currentDate);
  }

  isSelected = (date: string):boolean => {
    const { selected } = this.props;
    if(selected === undefined) return false;
    return selected.some(v => this.isDayEqual(date, v));
  }

  isDayEqual = (date: string, compareDate?: moment.Moment):boolean => {
    const { current } = this.props;
    const currentDate = moment(current).date(parseInt(date));
    if(!date.trim()) return false;
    if(!compareDate) return false;
    return isDayEqual(compareDate, currentDate);
  } 

  isRange = (date: string):boolean => {
    const { current, startDay, endDay } = this.props;
    const currentDate = moment(current).date(parseInt(date));
    
    if(!date.trim()) return false;
    if((startDay && currentDate.diff(startDay, 'days') > 0 )
      && (endDay && currentDate.diff(endDay, 'days') < 0)) return true;

    return false;
  }


  handleChange = (value: string) => {
    const { onChange, current } = this.props;

    if(onChange)
      onChange(moment(current).date(parseInt(value)));
  }

  render() {
    const {
      current,
      startDay,
      endDay
    } = this.props;

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
                    row.map((date,j) => (
                      <Day 
                        customClass={this.getCustomClass(date)}
                        customText={this.getCustomText(date)}
                        onChange={this.handleChange}
                        start={this.isDayEqual(date, startDay)}
                        end={this.isDayEqual(date, endDay)}
                        range={this.isRange(date)}
                        today={this.isDayEqual(date, moment())}
                        selected={this.isSelected(date)}
                        value={date} 
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
}
export default CalendarBody;