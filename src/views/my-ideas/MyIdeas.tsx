import React, { useState } from 'react';
import styled from 'styled-components';

import AddIcon from '../../assets/images/btn_addanidea@2x.png';
import BulbIcon from '../../assets/images/bulb@2x.png';
import Header from './components/header/Header';
import InlineEditRow from './components/inline-edit-row/InlineEditRow';
import { Idea } from './Idea';

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
    const initialRecords: Idea[] = [];
    const [records, setRecords] = useState(initialRecords);

    const onAdd = () => {
      console.log('add');
      const record: Idea = {
        content: "",
        impact: 10,
        ease: 10,
        confidence: 10,
        persisted: false
      };
      setRecords([record, ...records]);
    }

    return (
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>My Ideas</StyledTitle>
          <AddButtonImg src={AddIcon} onClick={onAdd}></AddButtonImg>
        </StyledHeader>
        <StyledIdeasContainer>
          {records.length === 0 ? (
            <StyledNoRecordsView>
              <BulbImg src={BulbIcon}></BulbImg>
              Got Ideas?
            </StyledNoRecordsView>
          ) : (
            <table>
              <thead>
                <Header></Header>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <InlineEditRow key={index} editMode={!record.persisted} record={record}></InlineEditRow>
                ))}
              </tbody>
            </table>
          )}
        </StyledIdeasContainer>
      </StyledContainer>
    );
}

export default MyIdeas;
