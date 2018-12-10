import * as React from 'react';
import * as moment from 'moment';
import { getDayMatrix, isDayEqual } from './util/DateUtil';
import Day from './Day';

interface Props{
  current: moment.Moment
  selected: moment.Moment[]
  onSelect: (value: moment.Moment) => void
  customDayClass?: (date: moment.Moment) => string | string[]
  customDayText?: (date: moment.Moment) => string
}
class CalendarBody extends React.Component<Props> {
  
  constructor(props:Props){
    super(props);
  }
  getDayClass = (value: string):string => {
    const { current, selected, customDayClass } = this.props;
    const now = moment();
    const currentDate = moment(current).date(parseInt(value));
    let classArr:string[] = [];
    
    if(!value.trim()) return '';

    classArr.push(`calendar__day--${currentDate.day()}`);

    if(isDayEqual(currentDate,now)) {
      classArr.push('calendar__day--today');
    }

    if(selected.filter(v => isDayEqual(v, currentDate)).length) {
      classArr.push('calendar__day--selected')
    }

    if( customDayClass !== undefined ) {
      const customClass = customDayClass(currentDate);
      classArr = classArr.concat(typeof(customClass) === 'string' ? 
        [customClass]: customClass);
    }

    return classArr.join(' '); 
  }

  getDayText = (value: string):string => {
    const { current, customDayText } = this.props;
    const currentDate = moment(current).date(parseInt(value));
    
    if(customDayText === undefined) return '';
  
    return customDayText(currentDate);
  }

  handleSelect = (value: string) => {
    const { current, onSelect } = this.props;
    if(value.trim())
      onSelect(moment(current).date(parseInt(value)))
  }


  render() {
    const {
      current,
      selected,
      onSelect
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
                    row.map((col,j) => (
                      <Day 
                        customClass={this.getDayClass(col)}
                        customText={this.getDayText(col)}
                        onSelect={() => this.handleSelect(col)}
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
}
export default CalendarBody;