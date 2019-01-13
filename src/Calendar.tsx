import * as React from 'react';
import * as moment from 'moment';
import CalendarContainer, { InheritProps as ContainerProps } from './CalendarContainer';
import { range } from 'lodash';

interface Props extends ContainerProps{
  showMonthCnt?: number
  top?: string
  left?: string
}

interface State {
  baseDate: moment.Moment
}

class Calendar extends React.Component<Props, State> {

  public static defaultProps = {
    showMonthCnt: 1
  }

  state = {
    baseDate: moment()
  }

  handlePrev = () => {
    const { baseDate } = this.state;
    this.setState({
      baseDate: baseDate.clone().subtract(1, 'months')
    });
  }

  handleNext = () => {
    const { baseDate } = this.state;
    this.setState({
      baseDate: baseDate.clone().add(1, 'months')
    });
  }

  render() {
    const { showMonthCnt, top, left } = this.props;
    const { baseDate } = this.state;

    return (
      <div className="calendar" style={{top, left}}>
        <div className="calendar__list">
          {
            range(showMonthCnt!)
              .map(idx => (
                <div 
                  className="calendar__item"
                  key={idx}
                >
                  <CalendarContainer
                    current={baseDate.clone().add(idx, 'months')}
                    prevIcon={idx==0}
                    nextIcon={idx==(showMonthCnt!-1)} 
                    onPrev={this.handlePrev}
                    onNext={this.handleNext}
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

export default Calendar;