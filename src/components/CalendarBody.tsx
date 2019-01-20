import * as moment from 'moment';
import * as React from 'react';
import { CalendarEnums } from '../common/@enum';
import { getMonthMatrix, getYearMatrix } from '../utils/DateUtil';
import DayView, { Props as DayViewProps } from './DayView';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';

interface CalendarBodyProps {
  viewMode: CalendarEnums.ViewMode;
  current: moment.Moment;
  onClick: (value: string) => void;
}
type Props = DayViewProps & CalendarBodyProps;
class CalendarBody extends React.Component<Props> {
  public render() {
    const { current, onClick } = this.props;
    const cell = (value: string, key: number) => (
      <TableCell text={value} onClick={text => onClick(text)} key={key} />
    );
    const viewMap = {
      [CalendarEnums.ViewMode.YEAR]: (
        <TableMatrixView matrix={getYearMatrix(current.year())} cell={cell} />
      ),
      [CalendarEnums.ViewMode.MONTH]: <TableMatrixView matrix={getMonthMatrix()} cell={cell} />,
      [CalendarEnums.ViewMode.DAY]: <DayView {...this.props} />,
    };

    return <div className="calendar__body">{viewMap[this.props.viewMode]}</div>;
  }
}
export default CalendarBody;
