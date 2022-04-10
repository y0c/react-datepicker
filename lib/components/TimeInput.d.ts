import * as React from 'react';
export interface Props {
    /** TimeInput onUp event */
    onUp: () => void;
    /** TimeInput onDown event */
    onDown: () => void;
    /** TimeInput onChange event */
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    /** TimeInput onBlur event */
    onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
    /** TimeInput value */
    value: number;
}
declare const TimeInput: React.FunctionComponent<Props>;
export default TimeInput;
