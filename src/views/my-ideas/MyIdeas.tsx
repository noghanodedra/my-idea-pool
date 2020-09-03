import { UserContext } from 'contexts/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { ideaService } from 'services/idea-service';
import { userService } from 'services/user-service';
import styled from 'styled-components';

import AddIcon from '../../assets/images/btn_addanidea@2x.png';
import BulbIcon from '../../assets/images/bulb@2x.png';
import Header from './components/header/Header';
import InlineEditRow from './components/inline-edit-row/InlineEditRow';
import { Idea } from './Idea';

const StyledContainer = styled.div`
  margin-left: 79px;
  margin-right: 87px;
  height: 100%;
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
  height: 750px;
  overflow-x: hidden;
  overflow-y: auto;
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

const defaultRecord: Idea = {
  id: "",
  content: "",
  impact: 10,
  ease: 9,
  confidence: 8,
};

const MyIdeas = () => {
    const initialRecords: Idea[] = [];
    const [records, setRecords] = useState(initialRecords);
    const [addNewRecord, setAddNewRecord] = useState(false);

    let pageNumber = 1;

    const { setDetails } = useContext(UserContext);

    const getProfileDetails = async () => {
        try{
          const response = await userService.me();
          setDetails(response.data);
          return response.data;
        } catch(e) {
          console.log(e);
        }
        return null;
    }

    const getIdeas = async (pageNumber: number = 1) => {
      try {
        const response = await ideaService.getIdeas(pageNumber);
        setRecords([]);
        setRecords(response.data);
        return response.data;
      } catch (e) {
        console.log(e);
      }
      return null;
    };

    const onAdd = () => {
      console.log('add');
      setAddNewRecord(true);
    }
    
    useEffect(() => {
      getProfileDetails();
      getIdeas(pageNumber);
      return () => {
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
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
                {addNewRecord && (
                  <InlineEditRow
                    key={1}
                    record={defaultRecord}
                    removeInlineEditFn={setAddNewRecord}
                    recordsLoaderFn={getIdeas}
                  ></InlineEditRow>
                )}
                {records.map((record, index) => (
                  <InlineEditRow
                    key={record.id}
                    record={record}
                    recordsLoaderFn={getIdeas}
                  ></InlineEditRow>
                ))}
              </tbody>
            </table>
          )}
        </StyledIdeasContainer>
      </StyledContainer>
    );
}

export default MyIdeas;
