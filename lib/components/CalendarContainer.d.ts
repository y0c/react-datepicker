import * as dayjs from 'dayjs';
import * as React from 'react';
import { IDatePicker } from '../common/@types';
import { Props as DayViewProps } from './DayView';
interface CalendarContainerProps {
    /** Locale to use */
    locale?: IDatePicker.Locale;
    /** Calendar Show or Hide */
    show?: boolean;
    /** PrevIcon Show or Hide */
    prevIcon?: boolean;
    /** NextIcon Show or Hide */
    nextIcon?: boolean;
    /** Event for Calendar day click */
    onChange?: (date: dayjs.Dayjs) => void;
    /** TodayPanel show or hide */
    showToday?: boolean;
}
interface PrivateProps {
    /** CalendarContainer base prop */
    current: dayjs.Dayjs;
    /** Default Date parameter in calendar, which is the parent component */
    base: dayjs.Dayjs;
    /** Number of months to show at once */
    showMonthCnt: number;
    /** Set Calendar initial Date  */
    setBase: (base: dayjs.Dayjs) => void;
}
export interface State {
    viewMode: IDatePicker.ViewMode;
}
export declare type InheritProps = DayViewProps & CalendarContainerProps;
export declare type Props = CalendarContainerProps & DayViewProps & PrivateProps;
declare class CalendarContainer extends React.Component<Props, State> {
    static defaultProps: {
        current: dayjs.Dayjs;
        show: boolean;
        showMonthCnt: number;
        showToday: boolean;
        locale: string;
    };
    state: {
        viewMode: IDatePicker.ViewMode;
    };
    constructor(props: Props);
    getHeaderTitle: () => string;
    handleTitleClick: () => void;
    handleChange: (value: string) => void;
    handleBase: (method: string) => () => void;
    handleToday: () => void;
    renderCalendarHead: () => JSX.Element;
    renderTodayPane: () => JSX.Element;
    renderCalendarBody: () => JSX.Element;
    render(): JSX.Element;
}
export default CalendarContainer;
