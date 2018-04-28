import styled from "styled-components";

const StyledButton = styled.button`
  color: white;
  padding: 15px;
  font-size: 15px;
  width: ${props => (props.width ? props.width : "auto")};
  background-color: ${props => props.theme.primary};
  border: 0;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default StyledButton;
