import * as React from 'react';

interface Props{
  onPrev(): void,
  onNext(): void,
  title: string
}

const CalendarHead: React.SFC<Props> = ({
  onPrev,
  onNext,
  title
}) => {
  return (
    <div className="calendar__head">
      <div className="calendar__head--prev">
        <button 
          onClick={onPrev}
          className="calendar__head--button"
        > 
          <i className="icon-navigate_before"/>
        </button>
      </div>
      <h2 className="calendar__head--title">
        { title }
      </h2>
      <div className="calendar__head--next">
        <button 
          onClick={onNext}
          className="calendar__head--button"
        > 
          <i className="icon-navigate_next"/>
        </button>
      </div>
    </div>
  )
}

export default CalendarHead;