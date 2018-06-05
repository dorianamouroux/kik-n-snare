import React from "react";
import styled, { withTheme } from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import Button from "components/button";
import { startAuthentication, signOut } from "store/user";

const Container = styled.div`
  margin-left: auto;
`;

const AuthenticateUser = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const UserProfilePicture = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  margin: 0 5px;
`;

const SignOutButton = styled.button`
  border: 0;
  background: transparent;
  color: red;
  font-style: italic;
  cursor: pointer;
  padding: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

class User extends React.PureComponent {
  signIn = () => {
    this.props.authenticateWithGoogle();
  };

  signOut = () => {
    this.props.signOut();
  };

  renderUserState() {
    const { user } = this.props.auth;

    if (user) {
      const firstName = user.displayName.split(" ")[0];
      const img = user.photoURL;

      return (
        <AuthenticateUser>
          Hey {firstName}
          <UserProfilePicture src={img} alt="Your profile picture" />
          <SignOutButton onClick={this.signOut}>Sign-out</SignOutButton>
        </AuthenticateUser>
      );
    } else {
      return (
        <Button onClick={this.signIn} small>
          Sign-in
        </Button>
      );
    }
  }

  renderLoader() {
    const { theme } = this.props;

    return <Loader type="Oval" color={theme.primary} height={40} width={40} />;
  }

  render() {
    const { isLoading } = this.props.auth;

    return (
      <Container>
        {isLoading ? this.renderLoader() : this.renderUserState()}
      </Container>
    );
  }
}

export default compose(
  withTheme,
  connect(
    state => ({ auth: state.user }),
    dispatch => ({
      authenticateWithGoogle: () => dispatch(startAuthentication("google")),
      signOut: () => dispatch(signOut())
    })
  )
)(User);
