import * as React from 'react';
import * as dayjs from 'dayjs';
import Calendar, { Props as ICalendarProps } from '../src/components/Calendar';
import { Omit, Merge } from '../src/utils/TypeUtil';

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    /** showMonth count at once */
    showMonthCnt?: number;
  }
>;

interface IProps {
  multiple?: boolean;
}

interface State {
  selected: dayjs.Dayjs[];
}

type Props = CalendarProps & IProps;
class CalendarSelectedController extends React.Component<Props, State> {
  public static defaultProps = {
    multiple: false,
  };

  public state = {
    selected: [],
  };

  public handleChange = (date: dayjs.Dayjs) => {
    const { multiple } = this.props;
    this.setState({
      selected: multiple ? [...this.state.selected, date] : [date],
    });
  };

  public handleClear = () => {
    this.setState({
      selected: [],
    });
  };

  public render() {
    const { selected } = this.state;
    return (
      <div>
        <Calendar {...this.props} selected={selected} onChange={this.handleChange} />
        {this.props.multiple && <button onClick={this.handleClear}>Clear</button>}
      </div>
    );
  }
}

export default CalendarSelectedController;
