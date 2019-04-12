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
  current: dayjs.Dayjs;
  /** DayClick Event */
  onClick: (value: string) => void;
  /** Locale to use */
  locale: IDatePicker.Locale;
}
type Props = DayViewProps & CalendarBodyProps;

const YEAR_VIEW_CLASS = 'calendar__year';
const MONTH_VIEW_CLASS = 'calendar__month';

const buildMatrixView = (
  matrix: string[][],
  className: string,
  onClick: (key: number, value: string) => () => void
) => {
  return (
    <TableMatrixView
      matrix={matrix}
      cell={(value: string, key: number) => (
        <TableCell key={key} className={className} text={value} onClick={onClick(key, value)} />
      )}
    />
  );
};

class CalendarBody extends React.Component<Props> {
  public static defaultProps = {
    viewMode: IDatePicker.ViewMode.DAY,
    locale: DatePickerDefaults.locale,
  };

  public render() {
    const { current, onClick, locale } = this.props;
    const viewMap = {
      [IDatePicker.ViewMode.YEAR]: buildMatrixView(
        getYearMatrix(dayjs(current).year()),
        YEAR_VIEW_CLASS,
        (_, v) => () => onClick(v)
      ),
      [IDatePicker.ViewMode.MONTH]: buildMatrixView(
        getMonthMatrix(locale),
        MONTH_VIEW_CLASS,
        (k, _) => () => onClick(String(k))
      ),
      [IDatePicker.ViewMode.DAY]: <DayView {...this.props} />,
    };

    return <div className="calendar__body">{viewMap[this.props.viewMode]}</div>;
  }
}
export default CalendarBody;
