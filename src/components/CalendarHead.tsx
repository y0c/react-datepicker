import * as React from 'react';

interface Props {
  /** Prev button click event */
  onPrev?: () => void;
  /** Next button click event */
  onNext?: () => void;
  /** Calenar Title Click Event */
  onTitleClick?: () => void;
  /** Prev Icon show or Hide */
  prevIcon?: boolean;
  /** Next icon show or hide */
  nextIcon?: boolean;
  /** Title to show in calendar  */
  title?: string;
}

const defaultProps = {
  title: '',
};

const CalendarHead: React.FunctionComponent<Props> = ({
  onPrev,
  onNext,
  prevIcon,
  nextIcon,
  title,
  onTitleClick,
}) => {
  return (
    <div className="calendar__head">
      <div className="calendar__head--prev">
        {prevIcon && (
          <button onClick={onPrev} className="calendar__head--button">
            <i className="icon-left" />
          </button>
        )}
      </div>
      <h2 className="calendar__head--title" onClick={onTitleClick}>
        {title}
      </h2>
      <div className="calendar__head--next">
        {nextIcon && (
          <button onClick={onNext} className="calendar__head--button">
            <i className="icon-right" />
          </button>
        )}
      </div>
    </div>
  );
};

CalendarHead.defaultProps = defaultProps;

export default CalendarHead;
