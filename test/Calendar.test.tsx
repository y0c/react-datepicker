import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as dayjs from 'dayjs';
import * as React from 'react';
import Calendar, { Props, State } from '../src/components/Calendar';
import CalendarContainer from '../src/components/CalendarContainer';

describe('<Calendar/>', () => {
  // 20180501
  let shallowComponent: ShallowWrapper<React.Component<Props, State>>;
  let mountComponent: ReactWrapper<Props, State>;
  const defaultProps = {
    base: dayjs(new Date(2018, 4, 1)),
  };

  it('redners with no props', () => {
    shallowComponent = shallow(<Calendar {...defaultProps} />);

    expect(shallowComponent).toBeTruthy();
    expect(shallowComponent).toMatchSnapshot();
  });

  it('props showMonthCnt correctly', () => {
    shallowComponent = shallow(<Calendar {...defaultProps} showMonthCnt={3} />);

    expect(shallowComponent.find('.calendar__item')).toHaveLength(3);
    // first calendar only previcon true
    expect(
      shallowComponent
        .find(CalendarContainer)
        .first()
        .props().prevIcon
    ).toBeTruthy();
    // last calendar only nextIcon true
    expect(
      shallowComponent
        .find(CalendarContainer)
        .last()
        .props().nextIcon
    ).toBeTruthy();
    // another calendar both hide
    expect(
      shallowComponent
        .find(CalendarContainer)
        .at(1)
        .props().nextIcon
    ).toBeFalsy();
    expect(
      shallowComponent
        .find(CalendarContainer)
        .at(1)
        .props().prevIcon
    ).toBeFalsy();
  });

  it('should setBase test', () => {
    mountComponent = mount(<Calendar {...defaultProps} />);
    // change view mode to month
    mountComponent.find('.calendar__head--title').simulate('click');

    mountComponent
      .find('td')
      .at(1)
      .simulate('click');

    expect(dayjs(mountComponent.state().base).format('MM')).toEqual('02');
  });
});
