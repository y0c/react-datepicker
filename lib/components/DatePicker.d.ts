import * as React from 'react';
import * as dayjs from 'dayjs';
import { Props as ICalendarProps } from './Calendar';
import { PickerProps, PickerAction } from './Picker';
import { Omit, Merge } from '../utils/TypeUtil';
import { Props as InputProps } from './PickerInput';
export declare enum TabValue {
    DATE = 0,
    TIME = 1
}
interface DatePickerProps {
    /** To display input format (dayjs format) */
    dateFormat?: string;
    /** include TimePicker true/false */
    includeTime?: boolean;
    /** show time only */
    showTimeOnly?: boolean;
    /** Initial display date */
    initialDate?: dayjs.Dayjs;
    /** Override InputComponent */
    inputComponent?: (props: InputProps) => JSX.Element;
    /** DatePicker value change Event */
    onChange?: (date: dayjs.Dayjs, rawValue: string) => void;
    /** DatePicker Input default Icon */
    showDefaultIcon: boolean;
}
export interface State {
    tabValue: TabValue;
    date?: dayjs.Dayjs;
    inputValue: string;
    selected: dayjs.Dayjs[];
}
declare type CalendarProps = Merge<Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>, {
    /** showMonth count at once */
    showMonthCnt?: number;
}>;
export declare type Props = DatePickerProps & Omit<InputProps, 'onChange'> & CalendarProps & PickerProps;
declare class DatePicker extends React.Component<Props, State> {
    static defaultProps: {
        includeTime: boolean;
        showMonthCnt: number;
        locale: string;
        portal: boolean;
        showDefaultIcon: boolean;
    };
    constructor(props: Props);
    getDateFormat(): string;
    handleDateChange: (date: dayjs.Dayjs) => void;
    handleTimeChange: (hour: number, minute: number) => void;
    handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleInputClear: () => void;
    handleInputBlur: (e: React.FormEvent<HTMLInputElement>) => void;
    renderInputComponent: () => JSX.Element;
    handleTab: (val: TabValue) => () => void;
    renderTabMenu: () => JSX.Element | null;
    renderCalendar: (actions: PickerAction) => JSX.Element | null;
    renderTime: () => JSX.Element | null;
    renderContents: (actions: PickerAction) => JSX.Element;
    render(): JSX.Element;
}
export default DatePicker;
