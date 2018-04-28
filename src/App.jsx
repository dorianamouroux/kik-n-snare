import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { baseStyles, theme } from "./styles";
import store from "./store";
import Index from "./views/index";

const App = () => {
  baseStyles();
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <Index />
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default App;
