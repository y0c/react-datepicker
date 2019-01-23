import { mount, shallow } from 'enzyme';

import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';

import CalendarBody from '../CalendarBody';
import CalendarContainer from '../CalendarContainer';
import CalendarHead from '../CalendarHead';

const mockMoment = moment.unix(1543622400);

describe('<CalendarContainer/>', () => {
  it('renders with no props', () => {
    const component = shallow(<CalendarContainer base={mockMoment} current={mockMoment} />);

    expect(component).toMatchSnapshot();
    expect(component.find(CalendarHead)).toHaveLength(1);
    expect(component.find(CalendarBody)).toHaveLength(1);
  });

  it('props show correctly', () => {
    const component = shallow(<CalendarContainer base={mockMoment} current={mockMoment} show />);

    expect(component).toMatchSnapshot();
    expect(component.hasClass('calendar--show')).toBeTruthy();
  });

  it('props locale correctly', () => {
    const en = mount(
      <CalendarContainer show locale="en-ca" current={mockMoment} base={mockMoment} />
    );

    const ko = mount(<CalendarContainer show locale="ko" current={mockMoment} base={mockMoment} />);
    expect(en).toMatchSnapshot();
    expect(
      en
        .find('th')
        .first()
        .text()
    ).toEqual('Sun');
    expect(
      ko
        .find('th')
        .first()
        .text()
    ).toEqual('일');
  });
});
