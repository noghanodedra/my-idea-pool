import React from 'react';
import styled from 'styled-components';

import AddIcon from '../../assets/images/btn_addanidea@2x.png';
import BulbIcon from '../../assets/images/bulb@2x.png';
import Header from './components/header/Header';
import InlineEditRow from './components/inline-edit-row/InlineEditRow';

const StyledContainer = styled.div`
  margin-left: 79px;
  margin-right: 87px;
  height: 100vh;
  width: 100%;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(42, 56, 66, 0.2);
`;

const StyledTitle = styled.div`
  font-size: 28px;
  color: #2a3842;
  margin: 41px 0 47px 20px;
`;

const AddButtonImg = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  padding-right: 10px;
`;

const StyledIdeasContainer = styled.div`
  text-align: center;
`;

const StyledNoRecordsView = styled.div`
  font-size: 20px;
  color: #2a3842;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

const BulbImg = styled.img`
  width: 64px;
  height: 96px;
  margin-top: 246px;
  margin-bottom: 23px;
`;

const MyIdeas = () => {
    const noRecords = false;
    return (
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>My Ideas</StyledTitle>
          <AddButtonImg src={AddIcon}></AddButtonImg>
        </StyledHeader>
        <StyledIdeasContainer>
          {noRecords && (
            <StyledNoRecordsView>
              <BulbImg src={BulbIcon}></BulbImg>
              Got Ideas?
            </StyledNoRecordsView>
          )}
          <Header></Header>
          <InlineEditRow></InlineEditRow>
        </StyledIdeasContainer>
      </StyledContainer>
    );
}

export default MyIdeas
