import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Button from "components/button";
import { startAuthentication } from "store/user";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-family: "Pacifico", cursive;
  text-align: center;
  width: 100%;
  z-index: -1;
  font-size: 30px;
  color: ${props => props.theme.primary};
  margin-top: 30px;
`;

class Header extends React.PureComponent {
  auth = () => {
    this.props.authenticateWithGoogle();
  };

  renderStatus() {
    const { user } = this.props.auth;

    if (user) {
      const firstName = user.displayName.split(" ")[0];
      return <p>Hey {firstName}</p>;
    } else {
      return <Button onClick={this.auth}>Sign-in</Button>;
    }
  }

  render() {
    const { isLoading } = this.props.auth;

    return (
      <Container>
        <Logo>Kik'n'Snare</Logo>
        {isLoading && <p>Loading...</p>}
        {!isLoading && this.renderStatus()}
      </Container>
    );
  }
}

export default connect(
  state => ({
    auth: state.user
  }),
  dispatch => ({
    authenticateWithGoogle: () => dispatch(startAuthentication("google"))
  })
)(Header);
