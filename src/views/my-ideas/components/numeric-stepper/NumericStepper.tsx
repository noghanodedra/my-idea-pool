import React from 'react';
import NumericInput from 'react-numeric-input';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const NumericStepper = (props: any) => {
     
    return (
      <StyledContainer>
        <NumericInput
          min={props.min}
          max={props.max}
          value={props.defaultValue}
          onChange={props.onChange}
        />
      </StyledContainer>
    );
}

export default NumericStepper;
