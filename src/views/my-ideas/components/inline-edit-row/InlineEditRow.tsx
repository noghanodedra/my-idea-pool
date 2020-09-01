import { confirmDialog } from 'components/ConfirmDialog';
import React, { useState } from 'react';
import styled from 'styled-components';

import BinIcon from '../../../../assets/images/bin@2x.png';
import CancelIcon from '../../../../assets/images/Cancel_X@2x.png';
import ConfirmIcon from '../../../../assets/images/Confirm_V@2x.png';
import PenIcon from '../../../../assets/images/pen@2x.png';
import { Idea } from '../../Idea';
import NumericStepper from '../numeric-stepper/NumericStepper';


const StyledContainer = styled.tr`
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-bottom: 36px;
`;

const StyledInput = styled.input`
  width: 422px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid rgba(42, 56, 66, 0.5);
  padding: 5px 5px 10px 0px;
  margin-left: 16px;
  margin-right: 20px;
  color: #2a3842;
  ::placeholder {
    color: ${(props) => props.theme.main.color.placeholder};
  }
`;

const StyledInputValue = styled.td`
  width: 422px;
  font-size: 16px;
  font-size: 16px;
  color: #2a3842;
  text-align: left;
  padding-left: 18px;
`;

const StyledDot = styled.td`
  height: 8px;
  width: 8px;
  background: rgba(42, 56, 66, 0.4);
  border-radius: 50%;
  display: inline-block;
`;


const StyledButtonImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 22px;
`;

const StyledText = styled.td`
  width: 20px;
  height: 20px;
  padding-left: 45px;
  font-size: 14px;
  color: #2a3842;
  text-align: center;
`;

const StyledNumericValue = styled(StyledText)`
  color: #4a4a4a;
  padding-left: 65px;
`;
const StyledTextValue = styled(StyledText)`
  padding-left: 73px;
`;

interface IProps {
  editMode: boolean;
  record: Idea;
}

const InlineEditRow = ({ editMode, record }: IProps) => {
  const [rowFocused, setRowFocused] = useState(false);
  const [mode, setMode] = useState(editMode);
  const [currentRecord, setCurrentRecord] = useState(record);

  console.log(editMode);

  const onDelete = () => {
    confirmDialog(() => {}, "This idea will be permanently deleted.");
  };

  const average = (record: Idea) => {
    return ((record.impact + record.ease + record.confidence)/ 3.0).toFixed(2);
  }

  return (
    <StyledContainer
      tabIndex={1}
      onMouseEnter={() => !editMode && setRowFocused(true)}
      onMouseLeave={() => !editMode && setRowFocused(false)}
    >
      <StyledDot></StyledDot>
      {mode ? (
        <>
          <td>
            <StyledInput
              name="content"
              type="text"
              value={currentRecord.content}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, content: e.target.value })
              }
            ></StyledInput>
          </td>
          <td>
            <NumericStepper
              defaultValue={currentRecord.impact}
              min={0}
              max={10}
              onChange={(val: number) =>
                setCurrentRecord({ ...currentRecord, impact: val })
              }
            ></NumericStepper>
          </td>
          <td>
            <NumericStepper
              defaultValue={currentRecord.ease}
              min={0}
              max={10}
              onChange={(val: number) =>
                setCurrentRecord({ ...currentRecord, ease: val })
              }
            ></NumericStepper>
          </td>
          <td>
            <NumericStepper
              defaultValue={currentRecord.confidence}
              min={0}
              max={10}
              onChange={(val: number) =>
                setCurrentRecord({ ...currentRecord, confidence: val })
              }
            ></NumericStepper>
          </td>
          <StyledText>{average(currentRecord)}</StyledText>
          <td width={85}>
            <StyledButtonImg src={ConfirmIcon}></StyledButtonImg>
            <StyledButtonImg src={CancelIcon}></StyledButtonImg>
          </td>
        </>
      ) : (
        <>
          <StyledInputValue>3D print all your emails</StyledInputValue>
          <StyledNumericValue>10</StyledNumericValue>
          <StyledNumericValue>9</StyledNumericValue>
          <StyledNumericValue>10</StyledNumericValue>
          <StyledTextValue>{average(record)}</StyledTextValue>
          {rowFocused && (
            <td>
              <StyledButtonImg
                src={PenIcon}
                onClick={() => setMode(true)}
              ></StyledButtonImg>
              <StyledButtonImg
                src={BinIcon}
                onClick={onDelete}
              ></StyledButtonImg>
            </td>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default InlineEditRow;
