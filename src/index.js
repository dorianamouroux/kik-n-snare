import React from "react";
import ReactGA from "react-ga";
import ReactDOM from "react-dom";
import App from "./App";
import Raven from "raven-js";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}

if (process.env.NODE_ENV === "production") {
  // track those users
  ReactGA.initialize("UA-73556931-2");
  ReactGA.pageview(window.location.pathname + window.location.search);

  // error reporting
  Raven.config(
    "https://3ff695499b4f4e91adb08d30d98f6767@sentry.io/1198243"
  ).install();
}
