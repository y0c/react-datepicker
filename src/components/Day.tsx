import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';

interface Props {
  value: string;
  customClass?: string;
  customText?: string;
  onChange?: (value: string) => void;
  start?: boolean;
  end?: boolean;
  range?: boolean;
  today?: boolean;
  selected?: boolean;
}

class Day extends React.Component<Props> {
  public static defaultProps = {
    value: '',
  };

  public handleChange = () => {
    const { onChange, value } = this.props;
    // click event common process add here
    if (onChange) {
      onChange(value);
    }
  };

  public render() {
    const { value, customClass, customText, selected, start, end, range, today } = this.props;

    const dateClass = classNames('calendar__day', customClass, {
      'calendar__day--end': end,
      'calendar__day--range': range,
      'calendar__day--selected': selected,
      'calendar__day--start': start,
      'calendar__day--today': today,
    });

    return (
      <td onClick={this.handleChange} className={dateClass}>
        <span>{value}</span>
        {customText && <span className="calendar__day--text">{customText}</span>}
      </td>
    );
  }
}

export default Day;
