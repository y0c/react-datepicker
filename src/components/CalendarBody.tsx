import * as moment from 'moment';
import * as React from 'react';
import { CalendarEnums } from '../common/@enum';
import { DatePickerDefaults } from '../common/Constant';
import { getMonthMatrix, getYearMatrix } from '../utils/DateUtil';
import DayView, { Props as DayViewProps } from './DayView';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';

interface CalendarBodyProps {
  /** Calendar viewMode(Year, Month, Day) */
  viewMode: CalendarEnums.ViewMode;
  /** Calendar current Date */
  current: moment.Moment;
  /** DayClick Event */
  onClick: (value: string) => void;
  /** Locale to use */
  locale: string;
}
type Props = DayViewProps & CalendarBodyProps;
class CalendarBody extends React.Component<Props> {
  public static defaultProps = {
    viewMode: CalendarEnums.ViewMode.DAY,
    onClick: () => {},
    locale: DatePickerDefaults.locale,
  };

  public render() {
    const { current, onClick, locale } = this.props;
    const cell = (className: string) => (value: string, key: number) => (
      <TableCell className={className} text={value} onClick={text => onClick(text)} key={key} />
    );
    const viewMap = {
      [CalendarEnums.ViewMode.YEAR]: (
        <TableMatrixView matrix={getYearMatrix(current.year())} cell={cell('calendar__year')} />
      ),
      [CalendarEnums.ViewMode.MONTH]: (
        <TableMatrixView matrix={getMonthMatrix(locale)} cell={cell('calendar__month')} />
      ),
      [CalendarEnums.ViewMode.DAY]: <DayView {...this.props} />,
    };

    return <div className="calendar__body">{viewMap[this.props.viewMode]}</div>;
  }
}
export default CalendarBody;
