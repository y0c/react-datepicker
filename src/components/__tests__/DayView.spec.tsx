import * as React from 'react';
import * as sinon from 'sinon';
import * as moment from 'moment';
import TestDayView from '../DayView';
import { shallow, mount, ReactWrapper } from 'enzyme';

describe('<DayView/>', () => {
  // 20181201
  const mockMoment = moment.unix(1543622400);

  const DayView = (props: any) => <TestDayView current={mockMoment} {...props} />;
  let mountComponent: ReactWrapper;

  let onClick: sinon.SinonSpy;

  describe('prop: selected', () => {
    beforeEach(() => {
      const selected = [
        moment('20181201'),
        moment('20181212'),
        moment('20181215'),
        moment('20181222'),
      ];

      mountComponent = mount(<DayView selected={selected} />);
    });

    it('should render correctly', () => {
      expect(mountComponent).toBeTruthy();
      expect(mountComponent).toMatchSnapshot();
    });

    it('should have selected elements', () => {
      expect(mountComponent.find('td.calendar__day--selected')).toHaveLength(4);
    });
  });

  describe('prop: startDay, endDay', () => {
    beforeEach(() => {
      const startDay = moment('20181205');
      const endDay = moment('20181211');

      mountComponent = mount(<DayView startDay={startDay} endDay={endDay} />);
    });
    it('should render correctly', () => {
      expect(mountComponent).toBeTruthy();
      expect(mountComponent).toMatchSnapshot();
    });

    it('should have startDay, endDay class td', () => {
      expect(mountComponent.find('td.calendar__day--start > div').text()).toEqual('5');
      expect(mountComponent.find('td.calendar__day--end > div').text()).toEqual('11');
    });

    it('should only occur when startDay, endDay exists', () => {
      const startDay = moment('20181205');
      mountComponent = mount(<DayView startDay={startDay} />);
      expect(mountComponent.find('td.calendar__day--range')).toHaveLength(0);
    });
  });

  describe('prop:customClass, customText', () => {
    beforeEach(() => {
      const customDayClass = (date: moment.Moment) => {
        const dayClassMap = {
          '20181202': ['custom-day', 'day-test1', 'day-test2'],
          '20181211': 'custom-day',
        };
        return dayClassMap[date.format('YYYYMMDD')];
      };

      const customDayText = (date: moment.Moment) => {
        // custom day class string or array
        const dayTextMap = {
          '20181202': '신정',
          '20181211': '공휴일',
        };
        return dayTextMap[date.format('YYYYMMDD')];
      };
      mountComponent = mount(
        <DayView customDayClass={customDayClass} customDayText={customDayText} />
      );
    });

    it('should render correctly', () => {
      expect(mountComponent).toBeTruthy();
      expect(mountComponent).toMatchSnapshot();
    });

    it('should have custom classes', () => {
      expect(mountComponent.find('td.day-test1')).toHaveLength(1);
      expect(mountComponent.find('td.day-test2')).toHaveLength(1);
      expect(mountComponent.find('td.day-test1 > div').text()).toEqual('2');
      expect(mountComponent.find('td.custom-day')).toHaveLength(2);
    });

    it('should have custom text', () => {
      expect(mountComponent.find('.sub__text')).toHaveLength(2);
    });
  });

  describe('prop: onClick', () => {
    beforeEach(() => {
      onClick = sinon.spy();
      mountComponent = mount(<DayView onClick={onClick} />);
    });

    it('should fire click event', () => {
      mountComponent
        .find('td')
        .at(6)
        .simulate('click');
      expect(onClick).toHaveProperty('callCount', 1);
    });
  });
});
