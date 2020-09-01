import React from 'react';
import styled from 'styled-components';

import Logo from '../assets/images/IdeaPool_icon@2x.png';

const StyledContainer = styled.div`
  background: ${(props) => props.theme.main.color.primary};
  width: 200px;
  text-align: center;
  height: 100vh;
`;

const StyledBrandLogo = styled.img`
  margin-top: 37px;
  width: 64px;
  height: 64px;
`;

const StyledBrandTitle = styled.div`
  margin-top: 13px;
  color: white;
`;

const StyledHR = styled.div`
  margin-top: 41px;
  margin-left: 26px;
  margin-right: 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledProfileContainer = styled.div`
  margin-top: 1px;
  margin-bottom: 10px;
`;

const StyledProfileAvatar = styled.div`
  margin-top: 37px;
`;

const StyledProfileImage = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;
`;

const StyledProfileDetailsUsername = styled.div`
  margin-top: 6px;
  font-size: 20px;
  color: white;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.main.color.placeholder};
  cursor: pointer;
  font-size: 16px;
`;

export const SideBar = () => {
    const isProfile = true;
    return (
      <StyledContainer>
        <StyledBrandLogo src={Logo} alt="logo" />
        <StyledBrandTitle>The Idea Pool</StyledBrandTitle>
        {isProfile && (
          <>
            <StyledHR></StyledHR>
            <StyledProfileContainer>
              <StyledProfileAvatar>
                <StyledProfileImage src="https://www.gravatar.com/avatar/b36aafe03e05a85031fd8c411b69f792?d=mm&s=200"></StyledProfileImage>
              </StyledProfileAvatar>
              <StyledProfileDetailsUsername>
                Noghan Odedra
              </StyledProfileDetailsUsername>
            </StyledProfileContainer>
            <StyledLink>Log out</StyledLink>
          </>
        )}
      </StyledContainer>
    );
}
