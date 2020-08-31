import React from 'react';
import styled from 'styled-components';

import Logo from '../assets/images/IdeaPool_icon.png';

const StyledContainer = styled.div`
  background: ${(props) => props.theme.main.color.primary};
  width: 200px;
  text-align: center;
  height: 100vh;
`;

const StyledBrandLogo = styled.img`
  margin-top: 37px;
`;

const StyledBrandTitle = styled.div`
  margin-top: 13px;
  color: white;
`;

export const SideBar = () => {
    return (
      <StyledContainer>
        <StyledBrandLogo src={Logo} alt="logo" />
        <StyledBrandTitle>The Idea Pool</StyledBrandTitle>
      </StyledContainer>
    );
}
