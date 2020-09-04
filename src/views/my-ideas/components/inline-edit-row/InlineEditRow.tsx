import { confirmDialog } from 'components/ConfirmDialog';
import React, { useState } from 'react';
import { ideaService } from 'services/idea-service';
import styled from 'styled-components';

import BinIcon from '../../../../assets/images/bin@2x.png';
import CancelIcon from '../../../../assets/images/Cancel_X@2x.png';
import ConfirmIcon from '../../../../assets/images/Confirm_V@2x.png';
import PenIcon from '../../../../assets/images/pen@2x.png';
import { Idea } from '../../../../models/Idea';
import NumericStepper from '../numeric-stepper/NumericStepper';

const StyledContainer = styled.tr`
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-bottom: 36px;
  height: 40px;
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

const StyledValidationMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: auto;
`;

interface IProps {
  record: Idea;
  removeInlineEditFn?: Function;
  recordsLoaderFn: Function;
}

const InlineEditRow = ({
  record,
  removeInlineEditFn,
  recordsLoaderFn,
}: IProps) => {
  const [mode, setMode] = useState(record.id.length === 0 ? true : false);
  const [currentRecord, setCurrentRecord] = useState(record);
  const [contentError, setContentError] = useState({ message: "" });

  console.log("editMode", mode);

  const _deleteRecord = async (id: string) => {
    try {
      await ideaService.deleteIdea(id);
      await recordsLoaderFn();
    } catch (error) {
    }
  };

  const onDelete = (id: string) => {
    confirmDialog(
      () => _deleteRecord(id),
      "This idea will be permanently deleted."
    );
  };

  const validateContent = () => {
    const val = currentRecord.content;
    if (!val || !val.length) {
      setContentError({ message: "This is required." });
      return false;
    }
    if (val && val.length > 255) {
      setContentError({ message: "Maximum allowed characters is 255." });
      return false;
    }
    return true;
  };

  const onAddEdit = async () => {
    try {
      if (!validateContent()) {
        return;
      }
      if (currentRecord.id.length > 0) {
        await ideaService.updateIdea(
          currentRecord.id,
          currentRecord.content,
          currentRecord.impact,
          currentRecord.ease,
          currentRecord.confidence
        );
        setMode(false);
      } else {
        await ideaService.createIdea(
          currentRecord.content,
          currentRecord.impact,
          currentRecord.ease,
          currentRecord.confidence
        );
        if (removeInlineEditFn) {
          removeInlineEditFn(false);
        }
      }
      await recordsLoaderFn();
    } catch (error) {
    }
  };

  const average = (record: Idea) => {
    const noOfScoreItems = 3.0;
    return (
      (record.impact + record.ease + record.confidence) /
      noOfScoreItems
    ).toFixed(1);
  };

  return (
    <StyledContainer className="row-container">
      <StyledDot></StyledDot>
      {mode ? (
        <>
          <td>
            <StyledInput
              name="content"
              type="text"
              placeholder="Content"
              min={1}
              max={255}
              defaultValue={currentRecord.content}
              onChange={(e) => {
                setCurrentRecord({ ...currentRecord, content: e.target.value });
                setContentError({ message: "" });
              }}
            ></StyledInput>
            {contentError && contentError.message.length > 0 && (
              <StyledValidationMessage>
                {contentError.message}
              </StyledValidationMessage>
            )}
          </td>
          <td>
            <NumericStepper
              defaultValue={currentRecord.impact}
              min={1}
              max={10}
              onChange={(val: number) =>
                setCurrentRecord({ ...currentRecord, impact: val })
              }
            ></NumericStepper>
          </td>
          <td>
            <NumericStepper
              defaultValue={currentRecord.ease}
              min={1}
              max={10}
              onChange={(val: number) =>
                setCurrentRecord({ ...currentRecord, ease: val })
              }
            ></NumericStepper>
          </td>
          <td>
            <NumericStepper
              defaultValue={currentRecord.confidence}
              min={1}
              max={10}
              onChange={(val: number) =>
                setCurrentRecord({ ...currentRecord, confidence: val })
              }
            ></NumericStepper>
          </td>
          <StyledText>{average(currentRecord)}</StyledText>
          <td width={85}>
            <StyledButtonImg
              src={ConfirmIcon}
              alt="Save Record"
              onClick={onAddEdit}
            ></StyledButtonImg>
            <StyledButtonImg
              src={CancelIcon}
              alt="Cancel Update"
              onClick={() => {
                record.id.length > 0
                  ? setMode(false)
                  : removeInlineEditFn && removeInlineEditFn();
              }}
            ></StyledButtonImg>
          </td>
        </>
      ) : (
        <>
          <StyledInputValue>{record.content}</StyledInputValue>
          <StyledNumericValue>{record.impact}</StyledNumericValue>
          <StyledNumericValue>{record.ease}</StyledNumericValue>
          <StyledNumericValue>{record.confidence}</StyledNumericValue>
          <StyledTextValue>{average(record)}</StyledTextValue>
          <td className="hidden">
            <StyledButtonImg
              src={PenIcon}
              alt="Edit Record"
              onClick={() => setMode(true)}
            ></StyledButtonImg>
            <StyledButtonImg
              src={BinIcon}
              alt="Remove Record"
              onClick={() => {
                onDelete(record.id);
              }}
            ></StyledButtonImg>
          </td>
        </>
      )}
    </StyledContainer>
  );
};

export default InlineEditRow;
