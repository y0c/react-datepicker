import * as React from 'react';

interface Props{
  value: string,
  customClass: string
}

const Day: React.SFC<Props> = ({
  value,
  customClass
}) => {
  return (
    <td className={customClass}>
      {value}
    </td> 
  )
}

export default Day;