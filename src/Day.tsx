import * as React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';

interface Props{
  value: string
  customClass: string
  customText: string
  onChange: (value: string) => void
  start: boolean
  end: boolean
  today: boolean
  selected: boolean
}

class Day extends React.Component<Props> {

  render() {
    const { 
      value, 
      customClass, 
      customText, 
      onChange, 
      selected,
      start,
      end,
      today
    } = this.props;

    const dateClass = classNames(
      'calendar__day', 
      customClass, 
      {
        'calendar__day--start': start,
        'calendar__day--end': end,
        'calendar__day--today': today,
        'calendar__day--selected': selected
      }
    );
    
    return (
      <td 
        onClick={e => onChange(value)} 
        className={dateClass}
      >
        <span>{value}</span>
        <span className="calendar__day--text">{customText}</span>
      </td> 
    )
  }
}

export default Day;