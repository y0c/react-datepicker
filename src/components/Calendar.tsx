import { range } from '../utils/ArrayUtil';
import * as dayjs from 'dayjs';
import * as React from 'react';
import CalendarContainer, { InheritProps as ContainerProps } from './CalendarContainer';

export interface Props extends ContainerProps {
  /** Calendar Initial Date Parameters */
  base: dayjs.Dayjs;
  /** Number of months to show at once */
  showMonthCnt: number;
}

export interface State {
  base: dayjs.Dayjs;
}

class Calendar extends React.Component<Props, State> {
  public static defaultProps = {
    base: dayjs(),
    showMonthCnt: 1,
    showToday: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      base: props.base,
    };
  }

  public setBase = (base: dayjs.Dayjs) => {
    this.setState({ base });
  };

  public render() {
    const { showMonthCnt, format, prevIcon, nextIcon } = this.props;
    const { base } = this.state;

    return (
      <div className="calendar">
        <div className="calendar__list">
          {range(showMonthCnt).map(idx => (
            <div className="calendar__item" key={idx}>
              <CalendarContainer
                {...this.props}
                base={this.state.base}
                current={dayjs(base).add(idx, 'month')}
                shouldShowPrevIcon={idx === 0}
                shouldShowNextIcon={idx === showMonthCnt! - 1}
                setBase={this.setBase}
                format={format}
                prevIcon={prevIcon}
                nextIcon={nextIcon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
