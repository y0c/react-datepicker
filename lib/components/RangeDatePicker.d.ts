import * as React from 'react';
import * as dayjs from 'dayjs';
import { PickerProps, PickerAction } from './Picker';
import { FieldType, InputProps } from './RangePickerInput';
import { Props as ICalendarProps } from './Calendar';
import { Merge, Omit } from '../utils/TypeUtil';
interface RangeDatePickerProps {
    /** To display input format (Day.js format) */
    dateFormat: string;
    /** Initial Calendar base date(if start date not set) */
    initialDate: dayjs.Dayjs;
    /** Initial Start Date */
    initialStartDate?: dayjs.Dayjs;
    /** Initial End Date */
    initialEndDate?: dayjs.Dayjs;
    /** RangeDatePicker change event */
    onChange?: (start?: dayjs.Dayjs, end?: dayjs.Dayjs) => void;
    /** start day display this prop(optional) */
    startText: string;
    /** end day display this prop(optional) */
    endText: string;
    /** calendar wrapping element */
    wrapper?: (calendar: JSX.Element) => JSX.Element;
    onClear?: (fieldType: FieldType) => void;
}
export interface State {
    start?: dayjs.Dayjs;
    end?: dayjs.Dayjs;
    hoverDate?: dayjs.Dayjs;
    startValue: string;
    endValue: string;
    mode?: FieldType;
}
declare type CalendarProps = Merge<Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>, {
    showMonthCnt?: number;
}>;
export declare type Props = RangeDatePickerProps & CalendarProps & InputProps & PickerProps;
declare class RangeDatePicker extends React.Component<Props, State> {
    static defaultProps: {
        dateFormat: string;
        portal: boolean;
        initialDate: dayjs.Dayjs;
        showMonthCnt: number;
        startText: string;
        endText: string;
    };
    constructor(props: Props);
    handleDateChange: (actions: PickerAction) => (date: dayjs.Dayjs) => void;
    handleInputChange: (fieldType: FieldType, value: string) => void;
    handleMouseOver: (date: dayjs.Dayjs) => void;
    handleInputBlur: (fieldType: FieldType, value: string) => void;
    handleCalendarText: (date: dayjs.Dayjs) => string;
    handleCalendarClass: (date: dayjs.Dayjs) => "" | "calendar__day--range";
    handleInputClear: (fieldType: FieldType) => void;
    renderRangePickerInput: () => JSX.Element;
    renderCalendar: (actions: PickerAction) => JSX.Element;
    render(): JSX.Element;
}
export default RangeDatePicker;
