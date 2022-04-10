import * as dayjs from 'dayjs';
import * as React from 'react';
import { IDatePicker } from '../common/@types';
export interface Props {
    /** Selected days to show in calendar */
    selected?: dayjs.Dayjs[];
    /** Start day to show in calendar */
    startDay?: dayjs.Dayjs;
    /** End day to show in calendar */
    endDay?: dayjs.Dayjs;
    /** Calendar day click Event */
    onClick?: (date: string) => void;
    /** Calendar day Mouseover Event */
    onMouseOver?: (date: dayjs.Dayjs) => void;
    /** Custom day class to show in day */
    customDayClass?: (date: dayjs.Dayjs) => string | string[];
    /** Custom day text to show in day */
    customDayText?: (date: dayjs.Dayjs) => string;
    /** Calendar day disable */
    disableDay?: (date: dayjs.Dayjs) => void;
}
interface PrivateProps {
    current: dayjs.Dayjs;
    locale: IDatePicker.Locale;
}
declare class DayView extends React.Component<Props & PrivateProps> {
    static defaultProps: {
        locale: string;
    };
    getDayClass: (date: string) => string;
    getCustomText: (date: string) => string;
    isIncludeDay: (date: string, dates?: dayjs.Dayjs[] | undefined) => boolean;
    handleClick: (date: string) => void;
    handleMouseOver: (date: string) => void;
    render(): JSX.Element;
}
export default DayView;
