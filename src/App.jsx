import React, { Component } from "react";
import { Provider } from "react-redux";

import Index from "./views/index";
import store from "./store";

import "./library";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
