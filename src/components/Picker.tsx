import * as React from 'react';
import * as CX from 'classnames';
import { IDatePicker } from '../common/@types';
import { getDivPosition, getDomHeight } from '../utils/DOMUtil';
import Backdrop from './Backdrop';

export interface PickerAction {
  show: () => void;
  hide: () => void;
}

export interface PickerProps {
  actions: PickerAction;
}

export interface Props {
  portal: boolean;
  direction?: IDatePicker.PickerDirection;
  className: string;
  renderTrigger: (props: PickerProps) => JSX.Element;
  renderContents: (props: PickerProps) => JSX.Element;
}

export interface State {
  show: boolean;
  position: IDatePicker.Position;
}

class Picker extends React.Component<Props, State> {
  public state = {
    show: false,
    position: {
      left: '',
      top: '',
    },
  };

  private triggerRef: React.RefObject<HTMLDivElement>;
  private contentsRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.triggerRef = React.createRef();
    this.contentsRef = React.createRef();
  }

  public showContents = () => {
    this.setState(
      {
        show: true,
      },
      this.setPosition
    );
  };

  public hideContents = () => {
    this.setState({
      show: false,
    });
  };

  public setPosition = () => {
    const { direction } = this.props;
    this.setState({
      position: getDivPosition(
        this.triggerRef.current,
        direction,
        getDomHeight(this.contentsRef.current)
      ),
    });
  };

  public getPosition = () => {
    const { portal } = this.props;
    const { position } = this.state;
    let pos;
    if (portal) {
      pos = position;
    }
    return pos;
  };

  public render() {
    const { portal, className, renderTrigger, renderContents } = this.props;
    const { show } = this.state;
    const actions = {
      show: this.showContents,
      hide: this.hideContents,
    };

    return (
      <div className="picker">
        <div className="picker__trigger" onClick={this.showContents} ref={this.triggerRef}>
          {renderTrigger({ actions })}
        </div>
        {show && (
          <div
            className={CX('picker__container', [portal, className])}
            role="dialog"
            aria-modal="true"
            style={{ ...this.getPosition() }}
            ref={this.contentsRef}
          >
            {renderContents({ actions })}
          </div>
        )}
        <Backdrop show={show} invert={portal} onClick={this.hideContents} />
      </div>
    );
  }
}

export default Picker;
