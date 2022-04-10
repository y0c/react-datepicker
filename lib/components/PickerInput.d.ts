import * as React from 'react';
export interface Props {
    /** Picker Input value */
    value?: string;
    /** Picker Input Readonly */
    readOnly?: boolean;
    /** Picker Input Disabled */
    disabled?: boolean;
    /** Picker Input clear icon */
    clear?: boolean;
    /** Picker Input show icon */
    icon?: JSX.Element;
    /** Picker Input onChange Event */
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    /** Picker Input onBlur Event */
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
    /** Picker Input onClick Event */
    onClick?: () => void;
    /** Picker Input onClear Event */
    onClear?: () => void;
    /** Picker Input Auto Focus */
    autoFocus?: boolean;
    /** Picker Input ClassName */
    className?: string;
    /** Picker Input Placeholder */
    placeholder?: string;
}
declare class PickerInput extends React.Component<Props> {
    inputRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props);
    componentDidMount(): void;
    handleClear: (e: React.MouseEvent<Element>) => void;
    renderInput: () => JSX.Element;
    renderClear: () => JSX.Element;
    render(): JSX.Element;
}
export default PickerInput;
