import 'react-confirm-alert/src/react-confirm-alert.css';

import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';


const StyledConfirmContainer = styled.div`
  text-align: center;
  width: 400px;
  height: 250px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

const StyledButton = styled.button`
  width: 120px;
  padding: 10px;
  margin: 10px;
  border: none;
  margin-bottom: 1px;
  margin-top: 86px;
  cursor: pointer;
  background: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  color: #2a3842;
  letter-spacing: -0.11px;
`;

const StyledButtonOk = styled(StyledButton)`
  color: #00a843 !important;
`;

const StyledMessage = styled.span`
  font-size: 16px;
  color: #2a3842;
  letter-spacing: -0.1px;
  line-height: 16px;
`;

const StyledTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 36px;
  font-size: 24px;
  color: #2a3842;
`;

export const confirmDialog = (onConfirm: any, message: string) =>
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <StyledConfirmContainer>
          <StyledTitle>Are you sure?</StyledTitle>
          <StyledMessage>{message}</StyledMessage>
          <StyledButton onClick={onClose}>Cancel</StyledButton>
          <StyledButtonOk
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Ok
          </StyledButtonOk>
        </StyledConfirmContainer>
      );
    },
  });
