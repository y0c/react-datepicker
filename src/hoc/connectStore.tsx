import * as React from 'react';
import { CalendarStore, ICalendarStore } from '../providers';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface IProps {}

export function connectStore<P extends ICalendarStore>(WrappedComponent: React.ComponentType<P>) {
  class Component extends React.Component<IProps> {
    public render() {
      const Comp = WrappedComponent as any;
      return (
        <CalendarStore.Consumer>
          {store => <Comp {...this.props} {...store} />}
        </CalendarStore.Consumer>
      );
    }
  }
  type ExposedProps = Omit<P, keyof ICalendarStore> & Partial<ICalendarStore>;
  return (Component as any) as React.ComponentType<ExposedProps>;
}
