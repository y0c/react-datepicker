import * as React from 'react';
import SVGIcon from './SVGIcon';

interface Props {
  /** Prev button click event */
  onPrev?: () => void;
  /** Next button click event */
  onNext?: () => void;
  /** Calenar Title Click Event */
  onTitleClick?: () => void;
  /** Prev Icon show or Hide */
  shouldShowPrevIcon?: boolean;
  /** Next icon show or hide */
  shouldShowNextIcon?: boolean;
  /** Title to show in calendar  */
  title?: string;
  /** Custom prevIcon */
  prevIcon?: React.ReactNode;
  /** Custom nextIcon */
  nextIcon?: React.ReactNode;
}

const defaultProps = {
  title: '',
};

const CalendarHead: React.FunctionComponent<Props> = ({
  onPrev,
  onNext,
  shouldShowPrevIcon,
  shouldShowNextIcon,
  prevIcon,
  nextIcon,
  title,
  onTitleClick,
}) => {
  return (
    <div className="calendar__head">
      <div className="calendar__head--prev">
        {shouldShowPrevIcon && (
          <button onClick={onPrev} className="calendar__head--button">
	          {prevIcon ? prevIcon : <SVGIcon id="left-arrow"/>}
          </button>
        )}
      </div>
      <h2 className="calendar__head--title" onClick={onTitleClick}>
        {title}
      </h2>
      <div className="calendar__head--next">
        {shouldShowNextIcon && (
          <button onClick={onNext} className="calendar__head--button">
	          {nextIcon ? nextIcon : <SVGIcon id="right-arrow"/>}
          </button>
        )}
      </div>
    </div>
  );
};

CalendarHead.defaultProps = defaultProps;

export default CalendarHead;
