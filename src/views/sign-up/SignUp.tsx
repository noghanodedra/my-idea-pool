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
  margin-top: 217px;
`;

const StyledButtonContainer = styled(DefaultStyledButtonContainer)`
  margin-top: 20px;
`;

const SignUp = () => {
    return (
      <DefaultStyledFormContainer>
        <StyledFormHeader>Sign Up</StyledFormHeader>
        <DefaultStyledForm>
          <DefaultStyledInput
            type="text"
            name="name"
            placeholder="Name"
            aria-label="Full name"
          />
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
            <DefaultStyledPrimaryButton>SIGN UP</DefaultStyledPrimaryButton>
            <div>
              Already have account ?
              <DefaultStyledLink>&nbsp;Log in</DefaultStyledLink>
            </div>
          </StyledButtonContainer>
        </DefaultStyledForm>
      </DefaultStyledFormContainer>
    );
}

export default SignUp;