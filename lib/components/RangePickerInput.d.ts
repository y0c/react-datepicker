import * as React from 'react';
import { Props as IPickerInputProps } from './PickerInput';
import { Merge, Omit } from '../utils/TypeUtil';
export declare enum FieldType {
    START = 0,
    END = 1
}
interface RangePickerInputProps {
    /** start input value */
    startValue?: string;
    /** end input value */
    endValue?: string;
    /** RangePickerInput change event field type is start or end */
    onChange?: (fieldType: FieldType, value: string) => void;
    /** RangePickerInput Blur event field type is start or end */
    onBlur?: (fieldType: FieldType, value: string) => void;
    /** RangePickerInput click event field type is start or end */
    onClick?: (fieldType: FieldType) => void;
    /** RangePickerInput clear event */
    onClear?: (fieldType: FieldType) => void;
}
export declare type InputProps = Merge<Omit<IPickerInputProps, 'onBlur' | 'onClear' | 'onChange' | 'onClick' | 'placeholder'>, {
    /** start input placeholder */
    startPlaceholder?: string;
    /** end input placeholder */
    endPlaceholder?: string;
}>;
declare type Props = RangePickerInputProps & InputProps;
declare class RangePickerInput extends React.Component<Props> {
    handleChange: (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) => void | undefined;
    handleBlur: (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) => void | undefined;
    handleClick: (fieldType: FieldType) => () => void | undefined;
    handleClear: (fieldType: FieldType) => () => void | undefined;
    renderStartInput: () => JSX.Element;
    renderEndInput: () => JSX.Element;
    renderPickerInput: (fieldType: FieldType, value?: string | undefined, placeholder?: string | undefined) => JSX.Element;
    render(): JSX.Element;
}
export default RangePickerInput;
