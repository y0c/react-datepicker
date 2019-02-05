import * as React from 'react';

interface Props {
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  clear?: boolean;
  icon?: JSX.Element;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const PickerInput: React.FunctionComponent<Props> = ({
  readOnly = false,
  disabled = false,
  value = '',
  clear,
  icon,
  onChange,
}) => {
  return (
    <div className="picker-input">
      <input
        className="picker-input__text"
        type="text"
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default PickerInput;
