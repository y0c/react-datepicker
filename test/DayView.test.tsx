import * as React from 'react';
import * as sinon from 'sinon';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import DayView from '../src/components/DayView';
import { mount, ReactWrapper } from 'enzyme';

describe('<DayView/>', () => {
  const defaultProps = {
    current: dayjs(new Date(2018, 11, 5)),
  };
  let mountComponent: ReactWrapper;

  describe('prop: selected', () => {
    beforeEach(() => {
      const selected = [dayjs('20181201'), dayjs('20181212'), dayjs('20181215'), dayjs('20181222')];

      mountComponent = mount(<DayView {...defaultProps} selected={selected} />);
    });

    it('should render correctly', () => {
      expect(mountComponent).toBeTruthy();
      expect(mountComponent).toMatchSnapshot();
    });

    it('does selected add class --selected', () => {
      expect(mountComponent.find('td.calendar__day--selected')).toHaveLength(4);
    });
  });

  describe('prop: disabled', () => {
    let onClick: sinon.SinonSpy;

    beforeEach(() => {
      const disableDay = (date: dayjs.Dayjs) => {
        return dayjs(date).isSame(dayjs('20181201'), 'date');
      };
      onClick = sinon.spy();
      mountComponent = mount(
        <DayView {...defaultProps} disableDay={disableDay} onClick={onClick} />
      );
    });

    it('does disabled dates add class --disabled', () => {
      expect(mountComponent.find('td.calendar__day--disabled')).toHaveLength(1);
    });

    it('does disabled dates onClick not fired', () => {
      mountComponent
        .find('td.calendar__day--disabled')
        .first()
        .simulate('click');
      expect(onClick).toHaveProperty('callCount', 0);
    });
  });

  describe('prop: startDay, endDay', () => {
    beforeEach(() => {
      const startDay = dayjs('20181205');
      const endDay = dayjs('20181211');

      mountComponent = mount(<DayView {...defaultProps} startDay={startDay} endDay={endDay} />);
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
      const startDay = dayjs('20181205');
      mountComponent = mount(<DayView {...defaultProps} startDay={startDay} />);
      expect(mountComponent.find('td.calendar__day--range')).toHaveLength(0);
    });
  });

  describe('prop:customClass, customText', () => {
    beforeEach(() => {
      const customDayClass = (date: dayjs.Dayjs) => {
        const dayClassMap = {
          '20181202': ['custom-day', 'day-test1', 'day-test2'],
          '20181211': 'custom-day',
        };
        return dayClassMap[dayjs(date).format('YYYYMMDD')];
      };

      const customDayText = (date: dayjs.Dayjs) => {
        // custom day class string or array
        const dayTextMap = {
          '20181202': '신정',
          '20181211': '공휴일',
        };
        return dayTextMap[dayjs(date).format('YYYYMMDD')];
      };
      mountComponent = mount(
        <DayView {...defaultProps} customDayClass={customDayClass} customDayText={customDayText} />
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
    let onClick: sinon.SinonSpy;
    beforeEach(() => {
      onClick = sinon.spy();
      mountComponent = mount(<DayView {...defaultProps} onClick={onClick} />);
    });

    it('should fire click event', () => {
      mountComponent
        .find('td')
        .at(6)
        .simulate('click');
      expect(onClick).toHaveProperty('callCount', 1);
    });
  });

  describe('prop: onMouseOver', () => {
    let onMouseOver: sinon.SinonSpy;
    beforeEach(() => {
      onMouseOver = sinon.spy();
      mountComponent = mount(<DayView {...defaultProps} onMouseOver={onMouseOver} />);
    });

    it('should fire click event', () => {
      mountComponent
        .find('td')
        .at(6)
        .simulate('mouseover');
      expect(onMouseOver).toHaveProperty('callCount', 1);
    });
  });
});
