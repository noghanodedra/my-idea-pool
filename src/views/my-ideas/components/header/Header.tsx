import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.tr`
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-bottom: 21px;
  margin-top: 39px;
`;

const StyleHeaderTitle = styled.th`
  height: 20px;
  width: 50px;
  text-align: center;
  margin-left: 34px;
  font-size: 14px;
  font-weight: normal;
  color: #2a3842;
`;
const StyleHeaderTitleNone = styled.th`
  height: 20px;
  width: 460px;
`;

const StyleHeaderTitleAvg = styled(StyleHeaderTitle)`
  margin-left: 45px;
  font-weight: bold;
  font-size: 14px;
  color: #2a3842;
`;

const Header = () => {
  return (
    <StyledContainer>
      <StyleHeaderTitleNone></StyleHeaderTitleNone>
      <StyleHeaderTitle>Impact</StyleHeaderTitle>
      <StyleHeaderTitle>Ease</StyleHeaderTitle>
      <StyleHeaderTitle>Confidence</StyleHeaderTitle>
      <StyleHeaderTitleAvg>Avg.</StyleHeaderTitleAvg>
    </StyledContainer>
  );
};

export default Header;
