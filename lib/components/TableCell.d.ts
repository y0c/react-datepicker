import * as React from 'react';
interface Props {
    className?: string;
    text?: string;
    subText?: string;
    onClick?: (text: string) => void;
    onMouseOver?: (text: string) => void;
}
declare const Cell: React.FunctionComponent<Props>;
export default Cell;
