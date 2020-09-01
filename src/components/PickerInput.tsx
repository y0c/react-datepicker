import * as React from 'react';
import * as classNames from 'classnames';
import SVGIcon from './SVGIcon';

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
  /** input custom styles */
  inputStyles?: {
    [style: string]: string
  }
  /** input clear icon */
  clearIcon?: React.ReactNode;
}

class PickerInput extends React.Component<Props> {
  public inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef<HTMLInputElement>();
  }

  public componentDidMount() {
    const { current } = this.inputRef;
    const { autoFocus } = this.props;

    if (current && autoFocus) {
      current.focus();
    }
  }

  public handleClear = (e: React.MouseEvent) => {
    const { onClear } = this.props;
    if (onClear) onClear();
    e.stopPropagation();
  };

  public renderInput = () => {
    const {
      readOnly = false,
      disabled = false,
      value = '',
      icon,
      onChange,
      onClick,
      onBlur,
      placeholder,
      inputStyles = {},
    } = this.props;

    return (
      <input
        ref={this.inputRef}
        className="picker-input__text"
        type="text"
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          paddingLeft: icon ? '32px' : '10px',
          ...inputStyles
        }}
      />
    );
  };

  public renderClear = () => {
    const { clearIcon } = this.props;
    return clearIcon ? clearIcon : (
      <span className="picker-input__clear" onClick={this.handleClear}>
        <SVGIcon id="clear" />
      </span>
    );
  };

  public render() {
    const { clear, icon, className } = this.props;
    return (
      <div className={classNames('picker-input', className)}>
        {icon && <span className="picker-input__icon">{icon}</span>}
        {this.renderInput()}
        {clear && this.renderClear()}
      </div>
    );
  }
}

export default PickerInput;
