import * as React from 'react';

interface Props {
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  clear?: boolean;
  icon?: JSX.Element;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

interface State {
  value: string;
}

class PickerInput extends React.Component<Props, State> {
  public state = {
    value: this.props.value || '',
  };
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef<HTMLInputElement>();
  }

  public componentDidMount() {}

  public render() {
    const {
      readOnly = false,
      disabled = false,
      value = '',
      clear,
      icon,
      onChange,
      onClear,
    } = this.props;
    return (
      <div className="picker-input">
        {icon && <span className="picker-input__icon">{icon}</span>}
        <input
          ref={this.inputRef}
          className="picker-input__text"
          type="text"
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
        />
        {clear && (
          <span className="picker-input__clear" onClick={onClear}>
            <i className="icon icon-clear" />
          </span>
        )}
      </div>
    );
  }
}

export default PickerInput;
