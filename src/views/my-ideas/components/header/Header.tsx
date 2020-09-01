import React from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-bottom: 21px;
  margin-top: 39px;
`;

const StyleHeaderTitle = styled.span`
  height: 20px;
  width: 4%;
  text-align: center;
  margin-left: 34px;
  font-size: 14px;
`;
const StyleHeaderTitleNone = styled.span`
  height: 20px;
  width: 460px;
`;

const Header = () => {
    return (
      <StyledContainer>
        <StyleHeaderTitleNone></StyleHeaderTitleNone>
        <StyleHeaderTitle>Impact</StyleHeaderTitle>
        <StyleHeaderTitle>Ease</StyleHeaderTitle>
        <StyleHeaderTitle>Confidence</StyleHeaderTitle>
      </StyledContainer>
    );
}

export default Header
