import { mount, shallow } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import Calendar from '../Calendar';
import DatePicker from '../DatePicker';

const mockMoment = moment.unix(1543622400);

describe('<DatePicker/>', () => {
  it('renders with no props', () => {
    const component = shallow(<DatePicker base={mockMoment} />);
    expect(component).toMatchSnapshot();
    expect(component.find(Calendar).props().show).toBeFalsy();
    expect(component.find(Calendar).props().base).toEqual(mockMoment);
  });

  it('input interaction correctly', () => {
    const component = shallow(<DatePicker base={mockMoment} />);

    component.find('input').simulate('click');

    expect(component.find('.datepicker__backdrop')).toHaveLength(1);
    expect(component.find(Calendar).props().show).toBeTruthy();
    expect(component.find(Calendar).props().left).not.toEqual('');
    expect(component.find(Calendar).props().top).not.toEqual('');
    expect(component.state('calendarShow')).toBeTruthy();
  });

  it('props inputFormat correctly', () => {
    const component = mount(<DatePicker base={mockMoment} inputFormat="YYYYMMDD" />);

    expect(component).toMatchSnapshot();
    component
      .find('td')
      .at(3)
      .simulate('click');
    expect(component.find('input').props().value).toEqual('20181201');
  });

  it('props onChange correctly', () => {
    const onChange = sinon.spy();
    const component = mount(<DatePicker base={mockMoment} onChange={onChange} />);

    component
      .find('td')
      .at(3)
      .simulate('click');

    expect(onChange).toHaveProperty('callCount', 1);
    expect(component.state('calendarShow')).toBeFalsy();
    expect(component.state('selected')).toHaveLength(1);
  });

  it('props showMonthCnt correctly', () => {
    const component = mount(<DatePicker base={mockMoment} showMonthCnt={3} />);

    expect(component).toMatchSnapshot();
    expect(component.find('.calendar__container')).toHaveLength(3);
  });

  it('hideCalendar correctly', () => {
    const component = shallow(<DatePicker base={mockMoment} />);

    component.find('input').simulate('click');
    component.find('.datepicker__backdrop').simulate('click');
    expect(component.find(Calendar).props().show).toBeFalsy();
  });
});
