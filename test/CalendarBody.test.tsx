import { mount, shallow, ReactWrapper, ShallowWrapper } from 'enzyme';
import * as sinon from 'sinon';
import * as dayjs from 'dayjs';
import * as React from 'react';
import DayView from '../src/components/DayView';
import CalendarBody from '../src/components/CalendarBody';
import { IDatePicker } from '../src/common/@types';

describe('<CalendarBody />', () => {
  const defaultProps = {
    current: dayjs(new Date(2018, 11, 1)),
    onClick: sinon.spy(),
  };
  let shallowComponent: ShallowWrapper<React.Component>;
  let mountComponent: ReactWrapper;

  it('should render correctly', () => {
    shallowComponent = shallow(<CalendarBody {...defaultProps} />);
    expect(shallowComponent).toBeTruthy();
    expect(shallowComponent).toMatchSnapshot();
  });

  describe('prop: viewMode', () => {
    it('should ViewMode.DAY correctly', () => {
      shallowComponent = shallow(
        <CalendarBody {...defaultProps} viewMode={IDatePicker.ViewMode.DAY} />
      );
      expect(shallowComponent.find(DayView)).toHaveLength(1);
    });

    it('should ViewMode.MONTH correctly', () => {
      mountComponent = mount(
        <CalendarBody {...defaultProps} viewMode={IDatePicker.ViewMode.MONTH} />
      );
      expect(mountComponent.find('td.calendar__month')).toHaveLength(12);
    });

    it('should ViewMode.YEAR correctly', () => {
      mountComponent = mount(
        <CalendarBody {...defaultProps} viewMode={IDatePicker.ViewMode.YEAR} />
      );
      expect(mountComponent.find('td.calendar__year')).toHaveLength(9);
    });
  });
});
