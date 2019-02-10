import * as React from 'react';
import * as classNames from 'classnames';

export interface Props {
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  clear?: boolean;
  icon?: JSX.Element;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
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

  public render() {
    const {
      readOnly = false,
      disabled = false,
      value = '',
      clear,
      icon,
      onChange,
      onClick,
      onBlur,
      className,
      placeholder,
    } = this.props;
    return (
      <div className={classNames('picker-input', className)}>
        {icon && <span className="picker-input__icon">{icon}</span>}
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
          }}
        />
        {clear && (
          <span className="picker-input__clear" onClick={this.handleClear}>
            <i className="icon icon-clear" />
          </span>
        )}
      </div>
    );
  }
}

export default PickerInput;
