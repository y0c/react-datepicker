import * as React from 'react';
import * as sinon from 'sinon';
import * as moment from 'moment';
import { shallow, mount } from 'enzyme';
import CalendarContainer from '../CalendarContainer';
import CalendarHead from '../CalendarHead';
import CalendarBody from '../CalendarBody';

const mockMoment = moment.unix(1546300800);

describe('<CalendarContainer/>', () => {
  
  it('renders with no props', () => {
    const component = shallow(
      <CalendarContainer 
        current={mockMoment}
      />
    );
    
    expect(component).toMatchSnapshot();
    expect(component.find(CalendarHead)).toHaveLength(1);
    expect(component.find(CalendarBody)).toHaveLength(1);
  });

  it('props show correctly', () => {
    const component = shallow(
      <CalendarContainer 
        current={mockMoment}
        show
      />
    );
    
    expect(component).toMatchSnapshot();
    expect(component.hasClass('calendar--show')).toBeTruthy();
  });

  it('props headerFormat correctly', () => {
    const component = shallow(
      <CalendarContainer 
        show
        headerFormat="YYYY/MM/DD"
        current={mockMoment}
      />
    );
    
    expect(component).toMatchSnapshot();
    expect(component.find(CalendarHead).props().title).toEqual('2019/01/01');
  });

  it('props locale correctly', () => {
    const en = mount(
      <CalendarContainer 
        show
        locale="en"
        current={mockMoment}
      />
    );
    
    const ko = mount(
      <CalendarContainer 
        show
        locale="ko"
        current={mockMoment}
      />
    );
    expect(en).toMatchSnapshot();
    expect(en.find('th').first().text()).toEqual('Sun');
    expect(ko.find('th').first().text()).toEqual('일');
  });
});