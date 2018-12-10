import * as React from 'react';

interface Props{
  value: string,
  customClass: string,
  onSelect: () => void
}

const Day: React.SFC<Props> = ({
  value,
  customClass,
  onSelect
}) => {
  return (
    <td 
      onClick={onSelect}
      className={`calendar__day ${customClass}`}
    >
      <span>{value}</span>
    </td> 
  )
}

export default Day;