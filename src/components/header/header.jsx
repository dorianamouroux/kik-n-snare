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
  // different states
  states = {
    loading: () => <p>Loading...</p>,
    anonymous: () => <Button onClick={this.auth}>Sign-in</Button>,
    authenticated: () => {
      const firstName = this.props.user.displayName.split(" ")[0];
      return <p>Hey {firstName}</p>;
    }
  };

  auth = () => {
    this.props.authenticateWithGoogle();
  };

  render() {
    const { status } = this.props;

    return (
      <Container>
        <Logo>Kik'n'Snare</Logo>
        {this.states[status]()}
      </Container>
    );
  }
}

export default connect(
  state => ({
    status: state.user.status,
    user: state.user.user
  }),
  dispatch => ({
    authenticateWithGoogle: () => dispatch(startAuthentication("google"))
  })
)(Header);
