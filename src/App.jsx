import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { baseStyles, theme } from "./styles";
import store from "./store";
import Header from "./components/header";
import Index from "./views/index";
import initFirebase from "./firebase.js";

// init firebase, needs the store
initFirebase(store);

const App = () => {
  baseStyles();
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <React.Fragment>
          <Header />
          <Index />
        </React.Fragment>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default App;
