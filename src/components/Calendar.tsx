import { range } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import CalendarContainer, { InheritProps as ContainerProps } from './CalendarContainer';

export interface Props extends ContainerProps {
  base: moment.Moment;
  showMonthCnt: number;
}

export interface State {
  base: moment.Moment;
}

class Calendar extends React.Component<Props, State> {
  public static defaultProps = {
    base: moment(),
    showMonthCnt: 1,
    showToday: true,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      base: props.base,
    };
  }

  public setBase = (base: moment.Moment) => {
    this.setState({ base });
  };

  public render() {
    const { showMonthCnt } = this.props;
    const { base } = this.state;

    return (
      <div className="calendar">
        <div className="calendar__list">
          {range(showMonthCnt).map(idx => (
            <div className="calendar__item" key={idx}>
              <CalendarContainer
                {...this.props}
                base={this.state.base}
                current={base.clone().add(idx, 'months')}
                prevIcon={idx === 0}
                nextIcon={idx === showMonthCnt! - 1}
                setBase={this.setBase}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
