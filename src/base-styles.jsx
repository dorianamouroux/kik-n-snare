// base-styles.js
import { injectGlobal } from "styled-components";
import reset from "styled-reset";

const baseStyles = () => injectGlobal`
  ${reset}
`;

export default baseStyles;
