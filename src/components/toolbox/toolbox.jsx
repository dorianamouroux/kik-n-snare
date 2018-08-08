import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { MdSave as SaveIcon } from "react-icons/md";
import { theme } from "styles";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButtonContainer = styled.button`
  background: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

class Toolbox extends React.PureComponent {
  save = () => {
    console.log("save");
  };

  renderSaveButton() {
    return (
      <SaveButtonContainer onClick={this.save}>
        <SaveIcon size="25px" color={theme.primary} />
      </SaveButtonContainer>
    );
  }

  render() {
    const { inDb } = this.props;

    return <Container>{!inDb && this.renderSaveButton()}</Container>;
  }
}

export default connect(state => ({
  inDb: state.sound.inDb
}))(Toolbox);
