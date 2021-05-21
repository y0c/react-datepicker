import * as React from 'react';
import SVGIcon from './SVGIcon';
export interface HeaderButtonProps {
  onClick?: () => void;
  className: string;
}

interface Props {
  /** Prev button click event */
  onPrev?: () => void;
  /** Next button click event */
  onNext?: () => void;
  /** Calenar Title Click Event */
  onTitleClick?: () => void;
  /** Prev Icon show or Hide */
  prevIcon?: ((props: HeaderButtonProps) => JSX.Element) | boolean;
  /** Next icon show or hide */
  nextIcon?: ((props: HeaderButtonProps) => JSX.Element) | boolean;
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
  const prevProps = {
    onClick: onPrev,
    className: 'calendar__head--button',
  };

  const nextProps = {
    onClick: onNext,
    className: 'calendar__head--button',
  };

  return (
    <div className="calendar__head">
      <div className="calendar__head--prev">
        {prevIcon === true ? (
          <button {...prevProps} type="button">
            <SVGIcon id="left-arrow" />
          </button>
        ) : typeof prevIcon === 'function' ? (
          prevIcon(prevProps)
        ) : null}
      </div>
      <h2 className="calendar__head--title" onClick={onTitleClick}>
        {title}
      </h2>
      <div className="calendar__head--next">
        {nextIcon === true ? (
          <button {...nextProps} type="button">
            <SVGIcon id="right-arrow" />
          </button>
        ) : typeof nextIcon === 'function' ? (
          nextIcon(nextProps)
        ) : null}
      </div>
    </div>
  );
};

CalendarHead.defaultProps = defaultProps;

export default CalendarHead;
