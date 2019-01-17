import { shallow } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import Calendar from '../Calendar';
import CalendarContainer from '../CalendarContainer';

const mockMoment = moment.unix(1543622400);

describe('<Calendar/>', () => {
  it('redners with no props', () => {
    const component = shallow(<Calendar base={mockMoment} />);

    expect(component).toMatchSnapshot();
  });

  it('props showMonthCnt correctly', () => {
    const component = shallow(<Calendar base={mockMoment} showMonthCnt={3} />);

    expect(component).toMatchSnapshot();
    expect(component.find('.calendar__item')).toHaveLength(3);
    // first calendar only previcon true
    expect(
      component
        .find(CalendarContainer)
        .first()
        .props().prevIcon
    ).toBeTruthy();
    // last calendar only nextIcon true
    expect(
      component
        .find(CalendarContainer)
        .last()
        .props().nextIcon
    ).toBeTruthy();
    // another calendar both hide
    expect(
      component
        .find(CalendarContainer)
        .at(1)
        .props().nextIcon
    ).toBeFalsy();
    expect(
      component
        .find(CalendarContainer)
        .at(1)
        .props().prevIcon
    ).toBeFalsy();
  });

  it('props top, left correctly', () => {
    const component = shallow(<Calendar base={mockMoment} top="100px" left="100px" />);

    expect(component).toMatchSnapshot();
    expect(component.props().style).toHaveProperty('top', '100px');
    expect(component.props().style).toHaveProperty('left', '100px');
  });
});
