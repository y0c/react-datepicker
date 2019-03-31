import * as React from 'react';
import * as sinon from 'sinon';
import * as dayjs from 'dayjs';
import { shallow, mount, ReactWrapper } from 'enzyme';
import RangeDatePicker, { Props, State } from '../src/components/RangeDatePicker';
import { mountInputSimulateChange } from './utils/TestingUtil';

const START_INPUT_CLASS = '.range-picker-input__start .picker-input__text';
const END_INPUT_CLASS = '.range-picker-input__end .picker-input__text';
const INPUT_FORMAT = 'YYYY-MM-DD';

describe('<RangeDatePicker/>', () => {
  const defaultProps = {
    initialDate: dayjs(new Date(2018, 4, 1)),
  };

  const pickerShow = (component: ReactWrapper) => {
    component.find('Picker').setState({
      show: true,
    });
  };

  describe('shallow test', () => {
    it('should render without crash', () => {
      const shallowComponent = shallow(<RangeDatePicker />);
      expect(shallowComponent).toBeTruthy();
      expect(shallowComponent).toMatchSnapshot();
    });
  });

  describe('handleDateChange', () => {
    let mountComponent: ReactWrapper<Props, State>;
    const dayClick = (calendarAt: number) => (dayAt: number) =>
      mountComponent
        .find('.calendar__item')
        .at(calendarAt)
        .find('td')
        .at(dayAt)
        .simulate('click');

    it('should first select then state start change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      dayClick(0)(2);
      const start = mountComponent.state('start');
      expect(start).not.toBeUndefined();
      if (start) {
        expect(dayjs(start).format('YYYYMMDD')).toEqual('20180501');
      }
    });

    it('should state start be set & select start before then state start change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      mountComponent.setState({
        start: dayjs(new Date(2018, 4, 5)),
      });
      dayClick(0)(2);
      const start = mountComponent.state('start');
      expect(start).not.toBeUndefined();
      if (start) {
        expect(dayjs(start).format('YYYYMMDD')).toEqual('20180501');
      }
    });

    it('should state start be set & select start after then state end change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      mountComponent.setState({
        start: dayjs(new Date(2018, 4, 2)),
      });
      dayClick(0)(5);
      const end = mountComponent.state('end');
      expect(end).not.toBeUndefined();
      if (end) {
        expect(dayjs(end).format('YYYYMMDD')).toEqual('20180504');
      }
    });

    it('should state start, end be set then state start change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      mountComponent.setState({
        start: dayjs(new Date(2019, 4, 2)),
        end: dayjs(new Date(2018, 4, 9)),
      });
      dayClick(0)(5);
      const start = mountComponent.state('start');
      const end = mountComponent.state('end');
      expect(start).not.toBeUndefined();
      expect(end).toBeUndefined();
      if (start) {
        expect(dayjs(start).format('YYYYMMDD')).toEqual('20180504');
      }
    });

    it('should prop onChange fire correctly', () => {
      const onChange = sinon.spy();
      mountComponent = mount(<RangeDatePicker onChange={onChange} {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      dayClick(0)(5);
      expect(onChange).toHaveProperty('callCount', 1);
    });
  });

  describe('handleInputChange', () => {
    let mountComponent: ReactWrapper<Props, State>;

    beforeEach(() => {
      mountComponent = mount(<RangeDatePicker dateFormat={INPUT_FORMAT} {...defaultProps} />);
    });

    it('should start & end input change set state value', () => {
      const startInput = mountComponent.find(START_INPUT_CLASS);
      const endInput = mountComponent.find(END_INPUT_CLASS);
      const testValue = 'test';
      mountInputSimulateChange(startInput, testValue);
      expect(mountComponent.state('startValue')).toEqual(testValue);

      mountInputSimulateChange(endInput, testValue);
      expect(mountComponent.state('endValue')).toEqual(testValue);
    });
  });

  describe('handleInputBlur', () => {
    let mountComponent: ReactWrapper<Props, State>;
    const start = dayjs(new Date(2018, 4, 1));
    const end = dayjs(new Date(2018, 4, 11));

    beforeEach(() => {
      mountComponent = mount(<RangeDatePicker dateFormat={INPUT_FORMAT} {...defaultProps} />);
    });

    it('should state start & end undefined return empty value', () => {
      mountComponent.setState({
        ...mountComponent.state,
        start: undefined,
        end: undefined,
      });

      mountComponent.find(START_INPUT_CLASS).simulate('blur');
      expect(mountComponent.state('startValue')).toEqual('');

      mountComponent.find(END_INPUT_CLASS).simulate('blur');
      expect(mountComponent.state('endValue')).toEqual('');
    });

    it('should start input invalid value recover original date', () => {
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue: '20183343j',
        endValue: dayjs(end).format(INPUT_FORMAT),
      });

      mountComponent.find(START_INPUT_CLASS).simulate('blur');
      expect(mountComponent.state('startValue')).toEqual('2018-05-01');
    });

    it('should start input correct value set state date', () => {
      const changedValue = '2018-04-23';
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue: changedValue,
        endValue: dayjs(end).format(INPUT_FORMAT),
      });

      mountComponent.find(START_INPUT_CLASS).simulate('blur');
      const startState = mountComponent.state('start');
      expect(startState).not.toBeNull();
      if (startState) {
        expect(dayjs(startState).format(INPUT_FORMAT)).toEqual(changedValue);
      }
    });

    it('should end input invalid value recover original date', () => {
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue: dayjs(start).format(INPUT_FORMAT),
        endValue: '201804244',
      });

      mountComponent.find(END_INPUT_CLASS).simulate('blur');
      expect(mountComponent.state('endValue')).toEqual('2018-05-11');
    });

    it('should end input correct value set state date', () => {
      const changedValue = '2018-05-23';
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue: dayjs(start).format(INPUT_FORMAT),
        endValue: changedValue,
      });

      mountComponent.find(END_INPUT_CLASS).simulate('blur');
      const endState = mountComponent.state('end');
      expect(endState).not.toBeNull();
      if (endState) {
        expect(dayjs(endState).format(INPUT_FORMAT)).toEqual(changedValue);
      }
    });

    it('should startDate < endDate swap date', () => {
      const endInput = mountComponent.find(END_INPUT_CLASS);
      const testValue = '2018-04-23';
      // 2018-04-01
      const startValue = dayjs(start).format(INPUT_FORMAT);
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue,
        endValue: testValue,
      });

      endInput.simulate('blur');

      const startState = mountComponent.state('start');
      const endState = mountComponent.state('end');

      expect(startState).not.toBeNull();
      expect(endState).not.toBeNull();

      if (startState && endState) {
        expect(dayjs(startState).format(INPUT_FORMAT)).toEqual(testValue);
        expect(dayjs(endState).format(INPUT_FORMAT)).toEqual(startValue);
      }
    });

    it('should startDate > endDate swap date', () => {
      const startInput = mountComponent.find(START_INPUT_CLASS);
      const testValue = '2018-06-23';
      // 2018-04-01
      const endValue = dayjs(end).format(INPUT_FORMAT);
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        endValue,
        startValue: testValue,
      });

      startInput.simulate('blur');

      const startState = mountComponent.state('start');
      const endState = mountComponent.state('end');

      expect(startState).not.toBeNull();
      expect(endState).not.toBeNull();

      if (startState && endState) {
        expect(dayjs(startState).format(INPUT_FORMAT)).toEqual(endValue);
        expect(dayjs(endState).format(INPUT_FORMAT)).toEqual(testValue);
      }
    });
  });

  describe('handleInputClear', () => {
    let mountComponent: ReactWrapper;
    const rangeInputClass = (value: string) => `.range-picker-input__${value}`;
    const start = dayjs(new Date(2018, 4, 1));
    const end = dayjs(new Date(2018, 4, 11));

    beforeEach(() => {
      mountComponent = mount(<RangeDatePicker clear {...defaultProps} />);
    });

    it('should start input clear click start & startValue init correctly', () => {
      mountComponent.setState({
        ...mountComponent.state,
        start,
        startValue: dayjs(start).format(INPUT_FORMAT),
      });
      mountComponent
        .find(rangeInputClass('start'))
        .find('.icon-clear')
        .first()
        .simulate('click');

      const startState = mountComponent.state('start');
      const startValue = mountComponent.state('startValue');

      if (startState) {
        expect(startState).toBeUndefined();
        expect(startValue).toEqual('');
      }
    });

    it('should end input clear click end & endValue init correctly', () => {
      mountComponent.setState({
        ...mountComponent.state,
        end,
        endValue: dayjs(start).format(INPUT_FORMAT),
      });
      mountComponent
        .find(rangeInputClass('end'))
        .find('.icon-clear')
        .first()
        .simulate('click');

      const endState = mountComponent.state('end');
      const endValue = mountComponent.state('endValue');

      if (endState) {
        expect(endState).toBeUndefined();
        expect(endValue).toEqual('');
      }
    });
  });

  describe('handleMouseOver', () => {
    let mountComponent: ReactWrapper<Props, State>;

    beforeEach(() => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
    });

    it('does mouseover event set state hoverDate', () => {
      pickerShow(mountComponent);
      mountComponent
        .find('td')
        .at(5)
        .simulate('mouseover');
      const hoverDate = mountComponent.state('hoverDate');
      expect(hoverDate).not.toBeUndefined();
      if (hoverDate) {
        expect(dayjs(hoverDate).format('YYYYMMDD')).toEqual('20180504');
      }
    });

    it('should mouseover range hover correctly', () => {
      pickerShow(mountComponent);
      mountComponent.setState({
        ...mountComponent.state,
        start: dayjs(new Date(2018, 4, 1)),
      });

      mountComponent
        .find('td')
        .at(5)
        .simulate('mouseover');

      expect(
        mountComponent
          .find('td')
          .at(4)
          .hasClass('calendar__day--range')
      ).toBeTruthy();
    });
  });

  describe('Calendar Wrapper', () => {
    let mountComponent: ReactWrapper;

    beforeEach(() => {
      const wrapper = (calendar: JSX.Element) => {
        const container = <div className="wrapper-test">{calendar}</div>;
        return container;
      };
      mountComponent = mount(<RangeDatePicker {...defaultProps} wrapper={wrapper} />);
    });

    it('should calendar wrapper render without crash', () => {
      pickerShow(mountComponent);
      expect(mountComponent.find('.wrapper-test')).toHaveLength(1);
    });
  });
});
