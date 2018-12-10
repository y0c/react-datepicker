import * as React from 'react';

interface Props{
  value: string
  customClass: string
  customText: string
  onSelect: () => void
}

const Day: React.SFC<Props> = ({
  value,
  customClass,
  customText,
  onSelect
}) => {
  return (
    <td 
      onClick={onSelect}
      className={`calendar__day ${customClass}`}
    >
      <span>{value}</span>
      <span className="calendar__day--text">{customText}</span>
    </td> 
  )
}

export default Day;