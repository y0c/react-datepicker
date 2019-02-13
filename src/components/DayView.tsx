import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';
import { ifExistCall } from '../utils/FunctionUtil';

import { getDayMatrix, isDayEqual, isDayRange } from '../utils/DateUtil';

export interface Props {
  /** Selected days to show in calendar */
  selected?: moment.Moment[];
  /** Disable days show in calendar */
  disabled?: moment.Moment[];
  /** Start day to show in calendar */
  startDay?: moment.Moment;
  /** End day to show in calendar */
  endDay?: moment.Moment;
  /** Calendar day click Event */
  onClick?: (date: string) => void;
  /** Calendar day Mouseover Event */
  onMouseOver?: (date: moment.Moment) => void;
  /** Custom day class to show in day */
  customDayClass?: (date: moment.Moment) => string | string[];
  /** Custom day text to show in day */
  customDayText?: (date: moment.Moment) => string;
}

interface PrivateProps {
  current: moment.Moment;
  locale: string;
}

class DayView extends React.Component<Props & PrivateProps> {
  public static defaultProps = {
    locale: 'en-ca',
  };

  public getDayClass = (date: string): string => {
    const { current, customDayClass, startDay, endDay, selected, disabled } = this.props;
    const currentDate = moment(current).date(parseInt(date, 10));
    let classArr: string[] = [];

    if (!date.trim()) {
      return '';
    }

    if (customDayClass !== undefined) {
      const customClass = customDayClass(currentDate);
      classArr = classArr.concat(typeof customClass === 'string' ? [customClass] : customClass);
    }

    const dayClass = classNames('calendar__day', `calendar__day--${currentDate.day()}`, classArr, {
      'calendar__day--end': isDayEqual(currentDate, endDay),
      'calendar__day--range': isDayRange(currentDate, startDay, endDay),
      'calendar__day--selected': this.isIncludeDay(date, selected),
      'calendar__day--disabled': this.isIncludeDay(date, disabled),
      'calendar__day--start': isDayEqual(currentDate, startDay),
      'calendar__day--today': isDayEqual(currentDate, moment()),
    });

    return dayClass;
  };

  public getCustomText = (date: string): string => {
    const { current, customDayText } = this.props;
    const currentDate = moment(current).date(parseInt(date, 10));
    if (!date.trim()) {
      return '';
    }
    if (!customDayText) {
      return '';
    }

    return customDayText(currentDate);
  };

  public isIncludeDay = (date: string, dates?: moment.Moment[]): boolean => {
    const { current } = this.props;
    if (dates === undefined) {
      return false;
    }
    return dates.some(v => isDayEqual(moment(current).date(parseInt(date, 10)), v));
  };

  public handleClick = (date: string) => {
    if(this.isIncludeDay(date, this.props.disabled)) return ;
    ifExistCall(this.props.onClick, date);
  };

  public handleMouseOver = (date: string) => {
    const { onMouseOver, current } = this.props;
    ifExistCall(onMouseOver, moment(current).date(parseInt(date, 10)));
  };


  public render() {
    const { current, locale } = this.props;

    const dayMatrix = getDayMatrix(current.year(), current.month());
    const weekdays = moment.localeData(locale).weekdaysShort();

    return (
      <TableMatrixView
        headers={weekdays}
        matrix={dayMatrix}
        cell={(date, key) => (
          <TableCell
            className={this.getDayClass(date)}
            subText={this.getCustomText(date)}
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            text={date}
            key={key}
          />
        )}
      />
    );
  }
}

export default DayView;
