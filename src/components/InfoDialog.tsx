import 'react-confirm-alert/src/react-confirm-alert.css';

import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';

const StyledInfoContainer = styled.div`
  width: 450px;
  height: 200px;
  padding: 10px;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.23);
  background: #ffffff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledMessage = styled.span`
  font-size: 16px;
  color: red;
  letter-spacing: -0.1px;
  line-height: 16px;
  padding: 10px;
`;

const StyledOkButton = styled.button`
  color: #00a843 !important;
  font-size: 20px;
  border: 1px solid;
  background: none;
  width: 100px;
  padding: 4px;
  margin: 10px;
  cursor: pointer;
`;

export const InfoDialog = (message: string) =>
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <StyledInfoContainer>
          <StyledMessage>{message}</StyledMessage>
          <StyledOkButton
            onClick={() => {
              onClose();
            }}
          >
            Ok
          </StyledOkButton>
        </StyledInfoContainer>
      );
    },
  });
