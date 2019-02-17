import { mount, shallow, ReactWrapper, ShallowWrapper } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import DayView from '../src/components/DayView';
import TestCalendarBody from '../src/components/CalendarBody';
import { IDatePicker } from '../src/common/@types';

describe('<CalendarBody />', () => {
  // 20181201
  const mockMoment = moment.unix(1543622400);
  let shallowComponent: ShallowWrapper<React.Component>;
  let mountComponent: ReactWrapper;

  const CalendarBody = (props: any) => <TestCalendarBody current={mockMoment} {...props} />;

  it('should render correctly', () => {
    shallowComponent = shallow(<CalendarBody />);
    expect(shallowComponent).toBeTruthy();
    expect(shallowComponent).toMatchSnapshot();
  });

  describe('prop: viewMode', () => {
    it('should ViewMode.DAY correctly', () => {
      shallowComponent = shallow(
        <TestCalendarBody current={mockMoment} viewMode={IDatePicker.ViewMode.DAY} />
      );
      expect(shallowComponent).toMatchSnapshot();
      expect(shallowComponent.find(DayView)).toHaveLength(1);
    });

    it('should ViewMode.MONTH correctly', () => {
      mountComponent = mount(<CalendarBody viewMode={IDatePicker.ViewMode.MONTH} />);
      expect(mountComponent.find('td.calendar__month')).toHaveLength(12);
    });

    it('should ViewMode.YEAR correctly', () => {
      mountComponent = mount(<CalendarBody viewMode={IDatePicker.ViewMode.YEAR} />);
      expect(mountComponent.find('td.calendar__year')).toHaveLength(9);
    });
  });
});
