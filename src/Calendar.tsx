import { range } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import CalendarContainer, { InheritProps as ContainerProps } from './CalendarContainer';

interface Props extends ContainerProps {
  base: moment.Moment;
  showMonthCnt: number;
  top?: string;
  left?: string;
}

interface State {
  base: moment.Moment;
}

class Calendar extends React.Component<Props, State> {
  public static defaultProps = {
    base: moment(),
    showMonthCnt: 1,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      base: props.base,
    };
  }

  public handlePrev = () => {
    const { base } = this.state;
    this.setState({
      base: base.clone().subtract(1, 'months'),
    });
  };

  public handleNext = () => {
    const { base } = this.state;
    this.setState({
      base: base.clone().add(1, 'months'),
    });
  };

  public setDate = (type: 'year' | 'month', value: number) => {
    const date = this.state.base.clone();

    date[type](value);

    this.setState({
      base: date,
    });
  };

  public render() {
    const { showMonthCnt, top, left } = this.props;
    const { base } = this.state;

    return (
      <div className="calendar" style={{ top, left }}>
        <div className="calendar__list">
          {range(showMonthCnt).map(idx => (
            <div className="calendar__item" key={idx}>
              <CalendarContainer
                current={base.clone().add(idx, 'months')}
                prevIcon={idx === 0}
                nextIcon={idx === showMonthCnt! - 1}
                onPrev={this.handlePrev}
                onNext={this.handleNext}
                setDate={this.setDate}
                {...this.props}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
