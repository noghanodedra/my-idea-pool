import React from 'react';
import styled from 'styled-components';

import {
  DefaultStyledButtonContainer,
  DefaultStyledForm,
  DefaultStyledFormContainer,
  DefaultStyledFormHeader,
  DefaultStyledInput,
  DefaultStyledLink,
  DefaultStyledPrimaryButton,
} from '../../components/BaseComponents';

const StyledFormHeader = styled(DefaultStyledFormHeader)`
  margin-top: 235px;
`;

const StyledButtonContainer = styled(DefaultStyledButtonContainer)`
  margin-top: 20px;
`;

const Login = () => {
    return (
      <DefaultStyledFormContainer>
        <StyledFormHeader>Log In</StyledFormHeader>
        <DefaultStyledForm>
          <DefaultStyledInput
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
          />
          <DefaultStyledInput
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
          />
          <StyledButtonContainer>
            <DefaultStyledPrimaryButton>LOG IN</DefaultStyledPrimaryButton>
            <div>
              Don't have an account ?
              <DefaultStyledLink>&nbsp;Create an account</DefaultStyledLink>
            </div>
          </StyledButtonContainer>
        </DefaultStyledForm>
      </DefaultStyledFormContainer>
    );
}

export default Login;