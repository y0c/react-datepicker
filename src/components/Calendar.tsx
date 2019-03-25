import { range } from 'lodash';
import * as dayjs from 'dayjs';
import * as React from 'react';
import CalendarContainer, { InheritProps as ContainerProps } from './CalendarContainer';

export interface Props extends ContainerProps {
  /** Calendar Initial Date Parameters */
  base: Date;
  /** Number of months to show at once */
  showMonthCnt: number;
}

export interface State {
  base: Date;
}

class Calendar extends React.Component<Props, State> {
  public static defaultProps = {
    base: dayjs().toDate(),
    showMonthCnt: 1,
    showToday: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      base: props.base,
    };
  }

  public setBase = (base: Date) => {
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
                current={dayjs(base)
                  .add(idx, 'month')
                  .toDate()}
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
