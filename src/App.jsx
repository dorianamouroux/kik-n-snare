import React, { Component } from "react";
import { Provider } from "react-redux";

import baseStyles from "./base-styles";
import store from "./store";
import Index from "./views/index";

const App = () => {
  baseStyles();
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
