import * as classNames from 'classnames';
import * as dayjs from 'dayjs';
import * as React from 'react';
import { DatePickerDefaults } from '../common/Constant';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';
import { ifExistCall } from '../utils/FunctionUtil';
import { getWeekDays } from '../utils/LocaleUtil';

import { getDayMatrix, isDayEqual, isDayRange } from '../utils/DateUtil';

export interface Props {
  /** Selected days to show in calendar */
  selected?: Date[];
  /** Start day to show in calendar */
  startDay?: Date;
  /** End day to show in calendar */
  endDay?: Date;
  /** Calendar day click Event */
  onClick?: (date: string) => void;
  /** Calendar day Mouseover Event */
  onMouseOver?: (date: Date) => void;
  /** Custom day class to show in day */
  customDayClass?: (date: Date) => string | string[];
  /** Custom day text to show in day */
  customDayText?: (date: Date) => string;
  /** Calendar day disable */
  disableDay?: (date: Date) => void;
}

interface PrivateProps {
  current: Date;
  locale: string;
}

class DayView extends React.Component<Props & PrivateProps> {
  public static defaultProps = {
    locale: DatePickerDefaults.locale,
  };

  public getDayClass = (date: string): string => {
    const { current, customDayClass, startDay, endDay, selected, disableDay } = this.props;
    const currentDate = dayjs(current)
      .date(parseInt(date, 10))
      .toDate();
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
      `calendar__day--${dayjs(currentDate).day()}`,
      classArr,
      {
        'calendar__day--end': isDayEqual(currentDate, endDay),
        'calendar__day--range': isDayRange(currentDate, startDay, endDay),
        'calendar__day--selected': this.isIncludeDay(date, selected),
        'calendar__day--disabled': disableDay ? disableDay(currentDate) : false,
        'calendar__day--start': isDayEqual(currentDate, startDay),
        'calendar__day--today': isDayEqual(currentDate, dayjs().toDate()),
      }
    );

    return dayClass;
  };

  public getCustomText = (date: string): string => {
    const { current, customDayText } = this.props;
    const currentDate = dayjs(current)
      .date(parseInt(date, 10))
      .toDate();
    if (!date.trim()) {
      return '';
    }
    if (!customDayText) {
      return '';
    }

    return customDayText(currentDate);
  };

  public isIncludeDay = (date: string, dates?: Date[]): boolean => {
    const { current } = this.props;
    if (dates === undefined) {
      return false;
    }
    return dates.some(v =>
      isDayEqual(
        dayjs(current)
          .date(parseInt(date, 10))
          .toDate(),
        v
      )
    );
  };

  public handleClick = (date: string) => {
    const { current, disableDay } = this.props;
    const currentDate = dayjs(current)
      .date(parseInt(date, 10))
      .toDate();
    if (!(disableDay && disableDay(currentDate))) {
      ifExistCall(this.props.onClick, date);
    }
  };

  public handleMouseOver = (date: string) => {
    const { onMouseOver, current } = this.props;
    ifExistCall(
      onMouseOver,
      dayjs(current)
        .date(parseInt(date, 10))
        .toDate()
    );
  };

  public render() {
    const { current, locale } = this.props;

    const dayMatrix = getDayMatrix(dayjs(current).year(), dayjs(current).month());
    const weekdays = getWeekDays(locale);

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
