import * as React from 'react';
interface Props {
    /** hour to display */
    hour?: number;
    /** minute to display */
    minute?: number;
    /** hour, minute, type change event */
    onChange?: (hour: number, minute: number) => void;
    /** hour, minute blur event */
    onBlur?: (hour: number, minute: number) => void;
}
interface State {
    hour: number;
    minute: number;
}
declare class TimeContainer extends React.Component<Props, State> {
    state: {
        hour: number;
        minute: number;
    };
    handleChange: (item: string) => (e: React.FormEvent<HTMLInputElement>) => void;
    handleUp: (item: string) => () => void;
    handleDown: (item: string) => () => void;
    handleBlur: () => void;
    invokeOnChange: () => void;
    render(): JSX.Element;
}
export default TimeContainer;
