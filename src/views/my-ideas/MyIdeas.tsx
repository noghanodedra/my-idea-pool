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

const MyIdeas = () => {
    const initialRecords: Idea[] = [];
    const [records, setRecords] = useState(initialRecords);
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

    const getIdeas = async () => {
      try {
        const response = await ideaService.getIdeas(1);
        setRecords(response.data);
        return response.data;
      } catch (e) {
        console.log(e);
      }
      return null;
    };

    const onAdd = () => {
      console.log('add');
      const record: Idea = {
        id: "",
        content: "",
        impact: 10,
        ease: 9,
        confidence: 8,
      };
      setRecords([record, ...records]);
    }
    
    useEffect(() => {
      getProfileDetails();
      getIdeas();
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
                {records.map((record, index) => (
                  <InlineEditRow
                    editMode={record.id.length === 0 ? true : false}
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
