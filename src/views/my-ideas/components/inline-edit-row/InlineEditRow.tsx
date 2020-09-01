import React from 'react';
import styled from 'styled-components';

import CancelIcon from '../../../../assets/images/Cancel_X@2x.png';
import ConfirmIcon from '../../../../assets/images/Confirm_V@2x.png';
import NumericStepper from '../numeric-stepper/NumericStepper';

// import PenIcon from "../../assets/images/pen@2x.png";
// import BinIcon from "../../assets/images/bin@2x.png";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
`;

const StyledInput = styled.input`
  width: 422px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid rgba(42,56,66,0.50);
  padding: 5px 5px 10px 0px;
  margin-left: 16px;
  margin-right: 20px;
  ::placeholder {
    color: ${(props) => props.theme.main.color.placeholder};
  }
`;

const StyledDot = styled.span`
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
  margin-left: 22px;
`;

const StyledText = styled.span`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 40px;
  margin-right: 20px;
`;

const InlineEditRow = (props: any) => {
    return (
      <StyledContainer>
        <StyledDot></StyledDot>
        <StyledInput type="text"></StyledInput>
        <NumericStepper defaultValue={10} min={0} max={10}></NumericStepper>
        <NumericStepper defaultValue={10} min={0} max={10}></NumericStepper>
        <NumericStepper defaultValue={10} min={0} max={10}></NumericStepper>
        <StyledText>10</StyledText>
        <StyledButtonImg src={ConfirmIcon}></StyledButtonImg>
        <StyledButtonImg src={CancelIcon}></StyledButtonImg>
      </StyledContainer>
    );
}

export default InlineEditRow
