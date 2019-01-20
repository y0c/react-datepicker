import * as moment from 'moment';
import * as React from 'react';
import { CalendarEnums } from '../common/@enum';
import { ICalendar } from '../common/@types';

export interface ICalendarStore extends ICalendar.IStoreState {
  actions: ICalendar.IAction;
}
const actions: ICalendar.IAction = {
  setBase: () => void 0,
};

const store: ICalendarStore = {
  actions,
  base: moment(),
  showMonthCnt: 1,
  locale: 'ko',
  show: true,
  onChange: (date: moment.Moment) => void 0,
  selected: [],
  startDay: undefined,
  endDay: undefined,
};

const Context = React.createContext(store);

const { Provider, Consumer } = Context;

class StoreProvider extends React.Component<any, ICalendarStore> {
  public static getDerivedStateFromProps(nextProps: any, prevState: ICalendar.IStoreState) {
    if (
      nextProps.showMonthCnt === prevState.showMonthCnt &&
      nextProps.locale === prevState.locale &&
      nextProps.show === prevState.show &&
      nextProps.selected === prevState.selected &&
      nextProps.startDay === prevState.startDay &&
      nextProps.endDay === prevState.endDay
    ) {
      return null;
    }

    return {
      ...prevState,
      ...{
        showMonthCnt: nextProps.showMonthCnt,
        locale: nextProps.locale,
        show: nextProps.show,
        selected: nextProps.selected,
        startDay: nextProps.startDay,
        endDay: nextProps.endDay,
      },
    };
  }

  // initialize state by props once
  public state: ICalendarStore = {
    actions,
    base: this.props.base,
    onChange: this.props.onChange,
    customDayClass: this.props.customDayClass,
    customDayText: this.props.customDayText,
  };

  public actions = {
    setBase: (base: moment.Moment) => {
      this.setState({
        ...this.state,
        base,
      });
    },
  };

  public render() {
    const value = {
      actions: this.actions,
      state: this.state,
    };
    return (
      <Provider
        value={{
          ...this.state,
          ...{
            actions: this.actions,
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Consumer, Provider: StoreProvider };
