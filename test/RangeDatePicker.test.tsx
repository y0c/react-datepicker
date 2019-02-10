import * as React from 'react';
import * as sinon from 'sinon';
import * as moment from 'moment';
import { shallow, mount, ShallowWrapper, ReactWrapper, HTMLAttributes } from 'enzyme';
import RangeDatePicker, { Props, State } from '../src/components/RangeDatePicker';
import { mountInputSimulateChange } from './TestingUtil';

const START_INPUT_CLASS = '.range-picker-input__start .picker-input__text';
const END_INPUT_CLASS = '.range-picker-input__end .picker-input__text';
const INPUT_FORMAT = 'YYYY-MM-DD';

describe('<RangeDatePicker/>', () => {
  const defaultProps = {
    initialDate: new Date(2018, 4, 1),
  };

  describe('shallow test', () => {
    it('should render without crash', () => {
      const shallowComponent = shallow(<RangeDatePicker />);
      expect(shallowComponent).toBeTruthy();
      expect(shallowComponent).toMatchSnapshot();
    });
  });

  describe('props portal', () => {
    it('should no portal version position top & left operate correctly', () => {
      const mountComponent = mount(<RangeDatePicker />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');

      const containerStyle = mountComponent.find('.datepicker__container').get(0).props.style;
      expect(containerStyle.top).not.toEqual('');
      expect(containerStyle.left).not.toEqual('');
    });

    it('should portal version container add portal class', () => {
      const mountComponent = mount(<RangeDatePicker portal />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');

      expect(mountComponent.find('.datepicker__container').hasClass('portal')).toBeTruthy();
    });
  });

  describe('show & hide', () => {
    let mountComponent: ReactWrapper;
    beforeEach(() => {
      mountComponent = mount(<RangeDatePicker />);
    });

    it('should range picker input click then show Calendar', () => {
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      expect(mountComponent.find('.calendar')).toHaveLength(1);
      expect(mountComponent.state('show')).toBeTruthy();
    });

    it('should backdrop click then hide Calendar', () => {
      mountComponent.setState({
        show: true,
      });
      mountComponent.find('.rc-backdrop').simulate('click');
      expect(mountComponent.find('.calendar')).toHaveLength(0);
      expect(mountComponent.state('show')).toBeFalsy();
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
        expect(start.format('YYYYMMDD')).toEqual('20180501');
      }
    });

    it('should state start be set & select start before then state start change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      mountComponent.setState({
        start: moment(new Date(2018, 4, 5)),
      });
      dayClick(0)(2);
      const start = mountComponent.state('start');
      expect(start).not.toBeUndefined();
      if (start) {
        expect(start.format('YYYYMMDD')).toEqual('20180501');
      }
    });

    it('should state start be set & select start after then state end change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      mountComponent.setState({
        start: moment(new Date(2018, 4, 2)),
      });
      dayClick(0)(5);
      const end = mountComponent.state('end');
      expect(end).not.toBeUndefined();
      if (end) {
        expect(end.format('YYYYMMDD')).toEqual('20180504');
      }
    });

    it('should state start, end be set then state start change', () => {
      mountComponent = mount(<RangeDatePicker {...defaultProps} />);
      mountComponent.find(START_INPUT_CLASS).simulate('click');
      mountComponent.setState({
        start: moment(new Date(2018, 4, 2)),
        end: moment(new Date(2018, 4, 9)),
      });
      dayClick(0)(5);
      const start = mountComponent.state('start');
      const end = mountComponent.state('end');
      expect(start).not.toBeUndefined();
      expect(end).toBeUndefined();
      if (start) {
        expect(start.format('YYYYMMDD')).toEqual('20180504');
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
      mountComponent = mount(<RangeDatePicker inputFormat={INPUT_FORMAT} {...defaultProps} />);
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
    const start = moment(new Date(2018, 4, 1));
    const end = moment(new Date(2018, 4, 11));

    beforeEach(() => {
      mountComponent = mount(<RangeDatePicker inputFormat={INPUT_FORMAT} {...defaultProps} />);
    });
    it('should start input invalid value recover original date', () => {
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue: '20183343j',
        endValue: end.format(INPUT_FORMAT),
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
        endValue: end.format(INPUT_FORMAT),
      });

      mountComponent.find(START_INPUT_CLASS).simulate('blur');
      const startState = mountComponent.state('start');
      expect(startState).not.toBeNull();
      if (startState) {
        expect(startState.format(INPUT_FORMAT)).toEqual(changedValue);
      }
    });

    it('should end input invalid value recover original date', () => {
      mountComponent.setState({
        ...mountComponent.state,
        start,
        end,
        startValue: start.format(INPUT_FORMAT),
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
        startValue: start.format(INPUT_FORMAT),
        endValue: changedValue,
      });

      mountComponent.find(END_INPUT_CLASS).simulate('blur');
      const endState = mountComponent.state('end');
      expect(endState).not.toBeNull();
      if (endState) {
        expect(endState.format(INPUT_FORMAT)).toEqual(changedValue);
      }
    });

    it('should startDate < endDate swap date', () => {
      const endInput = mountComponent.find(END_INPUT_CLASS);
      const testValue = '2018-04-23';
      // 2018-04-01
      const startValue = start.format(INPUT_FORMAT);
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
        expect(startState.format(INPUT_FORMAT)).toEqual(testValue);
        expect(endState.format(INPUT_FORMAT)).toEqual(startValue);
      }
    });

    it('should startDate > endDate swap date', () => {
      const startInput = mountComponent.find(START_INPUT_CLASS);
      const testValue = '2018-06-23';
      // 2018-04-01
      const endValue = end.format(INPUT_FORMAT);
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
        expect(startState.format(INPUT_FORMAT)).toEqual(endValue);
        expect(endState.format(INPUT_FORMAT)).toEqual(testValue);
      }
    });
  });
});
