import * as moment from 'moment';
import { CalendarEnums } from './@enum';

export namespace ICalendar {
  export interface IStoreState {
    base: moment.Moment;
    showMonthCnt: number;
    locale?: string;
    show?: boolean;
    prevIcon?: boolean;
    nextIcon?: boolean;
    onChange?: (date: moment.Moment) => void;
    viewMode: CalendarEnums.ViewMode;
  }
}
