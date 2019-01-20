import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Day from '../Day';

describe('<Day/>', () => {
  it('renders the day with only value', () => {
    const component = shallow(<Day value="4" />);
    expect(component.contains('4')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('simulate click event', () => {
    const onChange = sinon.spy();
    const component = shallow(<Day onChange={onChange} />);

    component.simulate('click');
    expect(onChange).toHaveProperty('callCount', 1);
  });

  it('class start, end, today, selected, range', () => {
    const component = shallow(<Day start end today selected range />);

    expect(component.hasClass('calendar__day--start')).toBeTruthy();
    expect(component.hasClass('calendar__day--end')).toBeTruthy();
    expect(component.hasClass('calendar__day--today')).toBeTruthy();
    expect(component.hasClass('calendar__day--selected')).toBeTruthy();
    expect(component.hasClass('calendar__day--range')).toBeTruthy();
  });

  it('custom class correctly', () => {
    const component = shallow(<Day customClass="test" />);

    expect(component.hasClass('test')).toBeTruthy();
  });

  it('custom text correctly', () => {
    const component = shallow(<Day customText="start" />);

    expect(component.text()).toEqual('start');
  });
});
