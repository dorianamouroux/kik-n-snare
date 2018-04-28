import React from "react";
import ReactGA from "react-ga";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-73556931-2");
  ReactGA.pageview(window.location.pathname + window.location.search);
}
