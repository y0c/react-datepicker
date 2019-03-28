import * as React from 'react';
import * as dayjs from 'dayjs';
import { IDatePicker } from '../common/@types';
import { DatePickerDefaults } from '../common/Constant';
import { getMonthMatrix, getYearMatrix } from '../utils/DateUtil';
import DayView, { Props as DayViewProps } from './DayView';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';

interface CalendarBodyProps {
  /** Calendar viewMode(Year, Month, Day) */
  viewMode: IDatePicker.ViewMode;
  /** Calendar current Date */
  current: Date;
  /** DayClick Event */
  onClick: (value: string) => void;
  /** Locale to use */
  locale: string;
}
type Props = DayViewProps & CalendarBodyProps;

class CalendarBody extends React.Component<Props> {
  public static defaultProps = {
    viewMode: IDatePicker.ViewMode.DAY,
    locale: DatePickerDefaults.locale,
  };

  public render() {
    const { current, onClick, locale } = this.props;
    const viewMap = {
      [IDatePicker.ViewMode.YEAR]: (
        <TableMatrixView
          matrix={getYearMatrix(dayjs(current).year())}
          cell={(value: string, key: number) => (
            <TableCell
              key={key}
              className="calendar__year"
              text={value}
              onClick={() => onClick(value)}
            />
          )}
        />
      ),
      [IDatePicker.ViewMode.MONTH]: (
        <TableMatrixView
          matrix={getMonthMatrix(locale)}
          cell={(value: string, key: number) => (
            <TableCell
              key={key}
              className="calendar__month"
              text={value}
              onClick={() => onClick(String(key))}
            />
          )}
        />
      ),
      [IDatePicker.ViewMode.DAY]: <DayView {...this.props} />,
    };

    return <div className="calendar__body">{viewMap[this.props.viewMode]}</div>;
  }
}
export default CalendarBody;
