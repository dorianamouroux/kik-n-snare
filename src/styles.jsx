// base-styles.js
import { injectGlobal } from "styled-components";
import reset from "styled-reset";

const baseStyles = () => injectGlobal`
  ${reset}

  * {
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: #f8f8f8;
  }
`;

const theme = {
  primary: "#4CAF50"
};

export { baseStyles };
export { theme };
