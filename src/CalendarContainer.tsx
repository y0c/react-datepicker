import * as React from 'react';
import * as moment from 'moment';
import Calendar, { Props as CalendarProps } from './Calendar';
import { range } from 'lodash';

interface ContainerProps extends CalendarProps {
  showMonthCnt?: number
  top?: string
  left?: string
}

class CalendarContainer extends React.Component<ContainerProps> {

  public static defaultProps = {
    showMonthCnt: 1
  }

  render() {
    const { showMonthCnt, top, left } = this.props;
    return (
      <div className="calendar__wrapper" style={{top, left}}>
        <div className="calendar__list">
          {
            range(showMonthCnt!).map(idx => (
              <div 
                className="calendar__item"
                key={idx}
               >
                <Calendar
                  current={moment().add(idx, 'months')}
                  {...this.props}
                />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default CalendarContainer;