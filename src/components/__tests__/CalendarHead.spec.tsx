import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import CalendarHead from '../CalendarHead';

describe('<CalendarHead/>', () => {
  it('renders CalendarHead with no props', () => {
    const component = shallow(<CalendarHead />);

    expect(component).toMatchSnapshot();
  });

  it('props title correctly', () => {
    const component = shallow(<CalendarHead title="2019/01" />);

    expect(component).toMatchSnapshot();
    expect(component.find('h2.calendar__head--title').text()).toEqual('2019/01');
  });

  it('props prevIcon, nextIcon correctly', () => {
    const component = mount(<CalendarHead prevIcon nextIcon />);

    expect(component).toMatchSnapshot();
    expect(component.find('div.calendar__head--prev > button')).toHaveLength(1);
    expect(component.find('div.calendar__head--next > button')).toHaveLength(1);
  });

  it('props onPrev, onNext correctly', () => {
    const onPrev = sinon.spy();
    const onNext = sinon.spy();

    const component = mount(<CalendarHead prevIcon nextIcon onPrev={onPrev} onNext={onNext} />);

    expect(component).toMatchSnapshot();
    component.find('div.calendar__head--prev > button').simulate('click');
    component.find('div.calendar__head--next > button').simulate('click');

    expect(onPrev).toHaveProperty('callCount', 1);
    expect(onNext).toHaveProperty('callCount', 1);
  });
});
