import * as React from 'react';
interface Props {
    /** Backdrop background color invert option */
    invert?: boolean;
    /** Backdrop show or hide */
    show?: boolean;
    /** Backdrop click event */
    onClick?: () => void;
}
declare const Backdrop: React.FunctionComponent<Props>;
export default Backdrop;
