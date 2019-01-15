import * as React from 'react';
import * as sinon from 'sinon';
import * as moment from 'moment';
import { shallow, mount } from 'enzyme';
import CalendarBody from '../CalendarBody';

const mockMoment = moment.unix(1546300800);

describe('<CalendarBody />', () => {
  
  it('props current correctly', () => {
    const component = shallow(
      <CalendarBody
        current={mockMoment}
      />
    );
      
    expect(component).toMatchSnapshot();
  });

  it('props selected correctly', () => {
    const selected = [
      moment('20190102'),
      moment('20190105'),
      moment('20190112'),
      moment('20190122')
    ];
    const component = mount(
      <CalendarBody
        current={mockMoment}
        selected={selected}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.calendar__day--selected')).toHaveLength(selected.length);
  });

  it('props startDay, endDay correctly', () => {
    const startDay = moment('20190105', 'YYYYMMDD');
    const endDay = moment('20190112', 'YYYYMMDD');
    
    const component = mount(
      <CalendarBody
        current={mockMoment}
        startDay={startDay}
        endDay={endDay}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.calendar__day--start')).toHaveLength(1);
    expect(component.find('.calendar__day--end')).toHaveLength(1);
    expect(component.find('.calendar__day--start > span').text()).toEqual('5');
    expect(component.find('.calendar__day--end > span').text()).toEqual('12');
    expect(component.find('.calendar__day--range')).toHaveLength(6);
  });

  it('props onChange correctly', () => {
    const onChange = sinon.spy();

    const component = mount(
      <CalendarBody
        current={mockMoment}
        onChange={onChange}
      />
    );

    expect(component).toMatchSnapshot();
    component.find('td').first().simulate('click');
    expect(onChange).toHaveProperty('callCount', 1);
  });

  it('props customDayClass correctly', () => {
    const customDayClass = (date:moment.Moment) => {
      //custom day class string or array
      const dayClassMap = {
        '20190102': ['custom-day', 'day-test1', 'day-test2'],
        '20190111': 'custom-day'
      };
      return dayClassMap[date.format('YYYYMMDD')];
    };

    const component = mount(
      <CalendarBody
        current={mockMoment}
        customDayClass={customDayClass}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.day-test1')).toHaveLength(1);
    expect(component.find('.day-test2')).toHaveLength(1);
    expect(component.find('.day-test1').text()).toEqual('2');
    expect(component.find('.custom-day')).toHaveLength(2);
  });

  it('props customDayText correctly', () => {
    const customDayText = (date:moment.Moment) => {
      //custom day class string or array
      const dayTextMap = {
        '20190102': '신정',
        '20190111': '공휴일'
      };
      return dayTextMap[date.format('YYYYMMDD')];
    };

    const component = mount(
      <CalendarBody
        current={mockMoment}
        customDayText={customDayText}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.calendar__day--text')).toHaveLength(2);
  });
});