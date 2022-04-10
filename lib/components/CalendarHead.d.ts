import * as React from 'react';
interface Props {
    /** Prev button click event */
    onPrev?: () => void;
    /** Next button click event */
    onNext?: () => void;
    /** Calenar Title Click Event */
    onTitleClick?: () => void;
    /** Prev Icon show or Hide */
    prevIcon?: boolean;
    /** Next icon show or hide */
    nextIcon?: boolean;
    /** Title to show in calendar  */
    title?: string;
}
declare const CalendarHead: React.FunctionComponent<Props>;
export default CalendarHead;
