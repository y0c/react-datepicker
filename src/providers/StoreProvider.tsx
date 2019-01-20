import * as React from 'react';

const Context = React.createContext({});

const { Provider, Consumer } = Context;

class StoreProvider extends React.Component<any, any> {
  public state = {};

  public actions = {
    setValue: () => void 0,
  };

  public render() {
    const value = {
      actions: this.actions,
      state: this.state,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export default { Consumer, Provider: StoreProvider };
