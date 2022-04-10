import * as React from 'react';
interface IProps {
    /** panel display today string */
    today: string;
    /** today panel click event */
    onClick?: () => void;
    /** today panel show or hide */
    show?: boolean;
}
declare const TodayPanel: React.FunctionComponent<IProps>;
export default TodayPanel;
