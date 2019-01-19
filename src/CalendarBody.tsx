import * as React from 'react';
import * as moment from 'moment';
import TableCell from './TableCell';
import DayView, { Props as DayViewProps } from './DayView';
import TableMatrixView from './TableMatrixView';
import ViewMode from './ViewMode';
import { getYearMatrix, getMonthMatrix } from './util/DateUtil';

interface CalendarBodyProps {
  viewMode: ViewMode;
  current: moment.Moment;
  onClick: (value: string) => void;
}
type Props = DayViewProps & CalendarBodyProps;
class CalendarBody extends React.Component<Props> {
  public render() {
    const { current, onClick } = this.props;
    const cell = (value: string, key: number) => (
      <TableCell text={value} onClick={value => onClick(value)} key={key} />
    );
    const viewMap = {
      [ViewMode.YEAR]: <TableMatrixView matrix={getYearMatrix(current.year())} cell={cell} />,
      [ViewMode.MONTH]: <TableMatrixView matrix={getMonthMatrix()} cell={cell} />,
      [ViewMode.DAY]: <DayView {...this.props} />,
    };

    return <div className="calendar__body">{viewMap[this.props.viewMode]}</div>;
  }
}
export default CalendarBody;
