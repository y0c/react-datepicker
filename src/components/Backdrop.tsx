import * as React from 'react';
import * as classNames from 'classnames';

interface Props {
  /** Backdrop background color invert option */
  invert?: boolean;
  /** Backdrop show or hide */
  show?: boolean;
  /** Backdrop click event */
  onClick?: () => void;
}

const Backdrop: React.FunctionComponent<Props> = ({ invert, show, onClick }) => (
  <React.Fragment>
    {show && <div onClick={onClick} className={classNames('rc-backdrop', { invert })} />}
  </React.Fragment>
);

export default Backdrop;
