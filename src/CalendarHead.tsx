import * as React from 'react';

interface Props{
  onPrev?: () => void,
  onNext?: () => void,
  prevIcon?: boolean,
  nextIcon?: boolean,
  title?: string
}

const defaultProps = {
  title: ''
};

const CalendarHead: React.FunctionComponent<Props> = ({
  onPrev,
  onNext,
  prevIcon,
  nextIcon,
  title
}) => {
  return (
    <div className="calendar__head">
      <div className="calendar__head--prev">
        {
          prevIcon && (
            <button 
              onClick={onPrev}
              className="calendar__head--button"
            > 
              <i className="icon-navigate_before"/>
            </button>
          )
        }
      </div>
      <h2 className="calendar__head--title">
        { title }
      </h2>
      <div className="calendar__head--next">
        {
          nextIcon && (
            <button 
              onClick={onNext}
              className="calendar__head--button"
            > 
              <i className="icon-navigate_next"/>
            </button>
          )
        }
      </div>
    </div>
  )
}

CalendarHead.defaultProps = defaultProps;

export default CalendarHead;