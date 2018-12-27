import * as React from 'react';
import * as moment from 'moment';

interface Props{
  value: string
  customClass: string
  customText: string
  onChange: (value: string) => void
}


const Day: React.SFC<Props> = ({
  value,
  customClass,
  customText,
  onChange
}) => {
  return (
    <td 
      onClick={e => onChange(value)} 
      className={`calendar__day ${customClass}`}
    >
      <span>{value}</span>
      <span className="calendar__day--text">{customText}</span>
    </td> 
  )
}

export default Day;