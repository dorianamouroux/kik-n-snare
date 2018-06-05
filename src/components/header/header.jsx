import React from "react";
import styled from "styled-components";

import UserState from "./user";

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 55px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.05);
`;

const Container = styled.header`
  width: 100%;
  max-width: 900px;
  height: 100%;
  margin auto;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const Logo = styled.h1`
  position: absolute;
  padding-top: 12px;
  left: 50%;
  height: 100%;
  margin-left: -125px;
  font-family: "Pacifico", cursive;
  text-align: center;
  width: 250px;
  font-size: 30px;
  color: ${props => props.theme.primary};
`;

function HeaderKikNSnare() {
  return (
    <Header>
      <Container>
        <Logo>Kik'n'Snare</Logo>
        <UserState />
      </Container>
    </Header>
  );
}

export default HeaderKikNSnare;
