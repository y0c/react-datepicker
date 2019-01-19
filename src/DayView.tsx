import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';

import { getDayMatrix, isDayEqual, isDayRange } from './util/DateUtil';

export interface Props {
  selected?: moment.Moment[];
  startDay?: moment.Moment;
  endDay?: moment.Moment;
  onClick?: (value: string) => void;
  customDayClass?: (date: moment.Moment) => string | string[];
  customDayText?: (date: moment.Moment) => string;
}

interface PrivateProps {
  current: moment.Moment;
}

class DayView extends React.Component<Props & PrivateProps> {
  public getDayClass = (date: string): string => {
    const { current, customDayClass, startDay, endDay } = this.props;
    const currentDate = moment(current).date(parseInt(date, 10));
    let classArr: string[] = [];

    if (!date.trim()) {
      return '';
    }

    if (customDayClass !== undefined) {
      const customClass = customDayClass(currentDate);
      classArr = classArr.concat(typeof customClass === 'string' ? [customClass] : customClass);
    }

    const dayClass = classNames(
      'calendar__day',
      `calendar__day--${currentDate.day()}`,
      customDayClass,
      {
        'calendar__day--end': isDayEqual(currentDate, endDay),
        'calendar__day--range': isDayRange(currentDate, startDay, endDay),
        'calendar__day--selected': this.isSelected(date),
        'calendar__day--start': isDayEqual(currentDate, startDay),
        'calendar__day--today': isDayEqual(currentDate, current),
      }
    );

    return dayClass;
  };

  public getCustomText = (date: string): string => {
    const { current, customDayText, startDay, endDay } = this.props;
    const currentDate = moment(current).date(parseInt(date, 10));
    if (!date.trim()) {
      return '';
    }
    if (!customDayText) {
      return '';
    }

    return customDayText(currentDate);
  };

  public isSelected = (date: string): boolean => {
    const { selected } = this.props;
    if (selected === undefined) {
      return false;
    }
    return selected.some(v => this.isDayEqual(date, v));
  };

  public isDayEqual = (date: string, compareDate?: moment.Moment): boolean => {
    const { current } = this.props;
    const currentDate = moment(current).date(parseInt(date, 10));
    if (!date.trim()) {
      return false;
    }
    if (!compareDate) {
      return false;
    }
    return isDayEqual(compareDate, currentDate);
  };

  public isRange = (date: string): boolean => {
    const { current, startDay, endDay } = this.props;
    const currentDate = moment(current).date(parseInt(date, 10));

    if (!date.trim()) {
      return false;
    }
    if (!startDay || !endDay) {
      return false;
    }

    return isDayRange(currentDate, startDay, endDay);
  };

  public render() {
    const { current, onClick } = this.props;

    const dayMatrix = getDayMatrix(current.year(), current.month());
    const weekdays = moment.weekdaysShort();

    return (
      <TableMatrixView
        headers={weekdays}
        matrix={dayMatrix}
        cell={(date, key) => (
          <TableCell
            className={this.getDayClass(date)}
            subText={this.getCustomText(date)}
            onClick={onClick}
            text={date}
            key={key}
          />
        )}
      />
    );
  }
}

export default DayView;
