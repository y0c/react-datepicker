import * as React from 'react';
import { IDatePicker } from '../common/@types';
export interface PickerAction {
    show: () => void;
    hide: () => void;
}
export interface PickerRenderProps {
    actions: PickerAction;
}
export interface PickerProps {
    /** DatePicker portal version */
    portal?: boolean;
    /** DatePicker show direction (0 = TOP , 1 = BOTTOM) */
    direction?: IDatePicker.PickerDirection;
}
export interface Props {
    readOnly?: boolean;
    disabled?: boolean;
    className?: string;
    renderTrigger: (props: PickerRenderProps) => JSX.Element;
    renderContents: (props: PickerRenderProps) => JSX.Element;
}
export interface State {
    show: boolean;
    position: IDatePicker.Position;
}
declare class Picker extends React.Component<Props & PickerProps, State> {
    state: {
        show: boolean;
        position: {
            left: string;
            top: string;
        };
    };
    private triggerRef;
    private contentsRef;
    constructor(props: Props);
    showContents: () => void;
    hideContents: () => void;
    setPosition: () => void;
    render(): JSX.Element;
}
export default Picker;
