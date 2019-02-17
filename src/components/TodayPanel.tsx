import * as React from 'react';
import * as classNames from 'classnames';

interface IProps {
  /** panel display today string */
  today: string;
  /** today panel click event */
  onClick?: () => void;
  /** today panel show or hide */
  show?: boolean;
}

const TodayPanel: React.FunctionComponent<IProps> = ({ today, show, onClick }) => (
  <div className={classNames('calendar__panel--today', { 'calendar__panel--show': show })}>
    <h2 onClick={onClick}>{today}</h2>
  </div>
);

export default TodayPanel;
