import * as React from 'react';
import PickerInput, { Props as IPickerInputProps } from './PickerInput';
import { Merge, Omit } from '../utils/TypeUtil';

export enum FieldType {
  START,
  END,
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
  onClick?: (fieldTyp: FieldType) => void;
}

export type InputProps = Merge<
  Omit<IPickerInputProps, 'onBlur' | 'onChange' | 'onClick' | 'placeholder'>,
  {
    /** start input placeholder */
    startPlaceholder?: string;
    /** end input placeholder */
    endPlaceholder?: string;
  }
>;

type Props = RangePickerInputProps & InputProps;

class RangePickerInput extends React.Component<Props> {
  public handleChange = (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(fieldType, e.currentTarget.value);
    }
  };

  public handleBlur = (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(fieldType, e.currentTarget.value);
    }
  };

  public handleClick = (fieldType: FieldType) => () => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(fieldType);
    }
  };

  public renderStartInput = () => {
    const { startValue, startPlaceholder } = this.props;
    return this.renderPickerInput(FieldType.START, startValue, startPlaceholder);
  };

  public renderEndInput = () => {
    const { endValue, endPlaceholder } = this.props;
    return this.renderPickerInput(FieldType.END, endValue, endPlaceholder);
  };

  public renderPickerInput = (fieldType: FieldType, value?: string, placeholder?: string) => {
    const { readOnly, disabled, clear, onClear } = this.props;
    return (
      <PickerInput
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        onClear={onClear}
        className="range"
        onClick={this.handleClick(fieldType)}
        onChange={this.handleChange(fieldType)}
        onBlur={this.handleBlur(fieldType)}
        placeholder={placeholder}
      />
    );
  };

  public render() {
    return (
      <div className="range-picker-input">
        <span className="range-picker-input__start">{this.renderStartInput()}</span>
        <span className="range-picker-input__icon">
          <i className="icon icon-right-arrow" />
        </span>
        <span className="range-picker-input__end">{this.renderEndInput()}</span>
      </div>
    );
  }
}

export default RangePickerInput;
