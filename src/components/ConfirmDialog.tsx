import 'react-confirm-alert/src/react-confirm-alert.css';

import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';

const StyledOkButton = styled.button`
  color: #00A843 !important;

`;

export const confirmDialog = (onConfirm: any, message: string) => confirmAlert({
   customUI: ({ onClose }) => {
     return (
       <div className="custom-ui">
         <div>Are you sure?</div>
         <p>{message}</p>
         <button onClick={onClose}>Cancel</button>
         <StyledOkButton
           onClick={() => {
             onConfirm();
             onClose();
           }}
         >
           Ok
         </StyledOkButton>
       </div>
     );
   },
});