import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';

import * as dayjs from 'dayjs';
import * as React from 'react';
import * as sinon from 'sinon';

import 'dayjs/locale/en';
import 'dayjs/locale/ko';

import CalendarContainer, { Props, State } from '../src/components/CalendarContainer';
import { IDatePicker } from '../src/common/@types';

describe('<CalendarContainer/>', () => {
  const current = dayjs(new Date(2018, 11, 5));
  let base = current;
  const setBase = (val: dayjs.Dayjs) => {
    base = val;
  };
  const defaultProps = {
    base,
    setBase,
    current,
  };

  let shallowComponent: ShallowWrapper<React.Component<Props>>;
  let mountComponent: ReactWrapper<Props, State>;

  describe('prop: show', () => {
    beforeEach(() => {
      shallowComponent = shallow(<CalendarContainer {...defaultProps} show />);
    });

    it('should render correctly', () => {
      expect(shallowComponent).toBeTruthy();
      expect(shallowComponent).toMatchSnapshot();
    });

    it('props show correctly', () => {
      expect(shallowComponent.hasClass('calendar--show')).toBeTruthy();
    });
  });

  describe('prop: locale', () => {
    let en: ReactWrapper<Props>;
    let ko: ReactWrapper<Props>;

    beforeEach(() => {
      en = mount(<CalendarContainer {...defaultProps} locale="en" />);
      ko = mount(<CalendarContainer {...defaultProps} locale="ko" />);
    });

    it('should locale prop correctly', () => {
      expect(ko).toMatchSnapshot();
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

  describe('handle base test(onPrev, onNext)', () => {
    beforeEach(() => {
      mountComponent = mount(
        <CalendarContainer {...defaultProps} prevIcon nextIcon showMonthCnt={1} />
      );
    });

    it('should onPrev correctly', () => {
      mountComponent.setState({
        viewMode: IDatePicker.ViewMode.DAY,
      });
      mountComponent.find('.calendar__head--prev > button').simulate('click');
      expect(dayjs(base).format('MM')).toEqual('11');

      mountComponent.setState({
        viewMode: IDatePicker.ViewMode.MONTH,
      });
      mountComponent.find('.calendar__head--prev > button').simulate('click');
      expect(dayjs(base).format('YYYY')).toEqual('2017');

      mountComponent.setState({
        viewMode: IDatePicker.ViewMode.YEAR,
      });
      mountComponent.find('.calendar__head--prev > button').simulate('click');
      expect(dayjs(base).format('YYYY')).toEqual('2008');
    });
  });

  describe('handle today test', () => {
    it('should handle today correctly', () => {
      mountComponent = mount(<CalendarContainer {...defaultProps} showToday prevIcon nextIcon />);
      mountComponent.setState({
        viewMode: IDatePicker.ViewMode.DAY,
      });
      mountComponent.find('.calendar__head--prev > button').simulate('click');
      mountComponent.find('.calendar__head--prev > button').simulate('click');
      mountComponent.find('.calendar__panel--today h2').simulate('click');
      expect(dayjs(base).format('YYYYMMDD')).toEqual(dayjs().format('YYYYMMDD'));
    });
  });

  describe('handle title click test', () => {
    it('should viewMode change correctly', () => {
      mountComponent = mount(<CalendarContainer {...defaultProps} />);
      // once click expect month
      mountComponent.find('.calendar__head--title').simulate('click');
      expect(mountComponent.state().viewMode).toEqual(IDatePicker.ViewMode.MONTH);

      // twice click expect year
      mountComponent.find('.calendar__head--title').simulate('click');
      expect(mountComponent.state().viewMode).toEqual(IDatePicker.ViewMode.YEAR);
    });

    it('should showMontCnt > 1 viewMode noChange', () => {
      mountComponent = mount(<CalendarContainer {...defaultProps} showMonthCnt={2} />);
      // once click expect day(showMontCnt > 1)
      mountComponent.find('.calendar__head--title').simulate('click');
      expect(mountComponent.state().viewMode).toEqual(IDatePicker.ViewMode.DAY);
    });
  });

  describe('handle change test', () => {
    it('should showMontCnt > 1 onChange call', () => {
      const onChange = sinon.spy();
      mountComponent = mount(
        <CalendarContainer
          {...defaultProps}
          base={dayjs(new Date(2018, 12, 4))}
          showMonthCnt={2}
          onChange={onChange}
        />
      );

      // empty date click
      mountComponent
        .find('td')
        .at(1)
        .simulate('click');

      expect(onChange).toHaveProperty('callCount', 0);

      mountComponent
        .find('td')
        .at(6)
        .simulate('click');

      expect(onChange).toHaveProperty('callCount', 1);
    });

    describe('Mode Specific test', () => {
      let onChange: sinon.SinonSpy;
      beforeEach(() => {
        onChange = sinon.spy();
        mountComponent = mount(<CalendarContainer {...defaultProps} onChange={onChange} />);
      });

      it('should year mode test', () => {
        mountComponent.setState({
          viewMode: IDatePicker.ViewMode.YEAR,
        });

        mountComponent
          .find('td')
          .at(6)
          .simulate('click');

        expect(dayjs(base).format('YYYY')).toEqual('2020');
        expect(mountComponent.state().viewMode).toEqual(IDatePicker.ViewMode.MONTH);
      });

      it('should month mode test', () => {
        mountComponent.setState({
          viewMode: IDatePicker.ViewMode.MONTH,
        });
        mountComponent
          .find('td')
          .at(1)
          .simulate('click');

        expect(dayjs(base).format('MM')).toEqual('02');
        expect(mountComponent.state().viewMode).toEqual(IDatePicker.ViewMode.DAY);
      });

      it('should day mode test', () => {
        mountComponent.setState({
          viewMode: IDatePicker.ViewMode.DAY,
        });

        mountComponent
          .find('td')
          .at(6)
          .simulate('click');

        expect(onChange).toHaveProperty('callCount', 1);
      });
    });
  });
});
