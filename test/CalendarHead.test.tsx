import { mount, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import CalendarHead from '../src/components/CalendarHead';

describe('<CalendarHead/>', () => {
  let shallowComponent: ShallowWrapper<React.Component>;

  it('should render correctly', () => {
    shallowComponent = shallow(<CalendarHead />);

    expect(shallowComponent).toBeTruthy();
    expect(shallowComponent).toMatchSnapshot();
  });

  it('should props title correctly', () => {
    shallowComponent = shallow(<CalendarHead title="2019/01" />);

    expect(shallowComponent).toMatchSnapshot();
    expect(shallowComponent.find('h2.calendar__head--title').text()).toEqual('2019/01');
  });

  it('should props prevIcon, nextIcon correctly', () => {
    shallowComponent = shallow(<CalendarHead prevIcon nextIcon />);

    expect(shallowComponent).toMatchSnapshot();
    expect(shallowComponent.find('div.calendar__head--prev > button')).toHaveLength(1);
    expect(shallowComponent.find('div.calendar__head--next > button')).toHaveLength(1);
  });

  it('should props onPrev, onNext correctly', () => {
    const onPrev = sinon.spy();
    const onNext = sinon.spy();

    shallowComponent = shallow(<CalendarHead prevIcon nextIcon onPrev={onPrev} onNext={onNext} />);

    expect(shallowComponent).toMatchSnapshot();
    shallowComponent.find('div.calendar__head--prev > button').simulate('click');
    shallowComponent.find('div.calendar__head--next > button').simulate('click');

    expect(onPrev).toHaveProperty('callCount', 1);
    expect(onNext).toHaveProperty('callCount', 1);
  });
});
