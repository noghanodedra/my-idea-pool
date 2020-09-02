import { AUTH_DETAILS } from 'constants/common.constants';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { userService } from 'services/user-service';
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

    const history = useHistory();

    const onSignUp = async () => {
      try {
        const response = await userService.signUp(
          "email-99@test.com",
          "mytest-user",
          "Password@123"
        );
        sessionStorage.removeItem(AUTH_DETAILS);
        sessionStorage.setItem(AUTH_DETAILS, JSON.stringify(response.data));
        setTimeout(() => {
          history.replace("/ideas");
        }, 500);
      } catch (e) {}
    }

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
            <DefaultStyledPrimaryButton type="button" onClick={onSignUp}>
              SIGN UP
            </DefaultStyledPrimaryButton>
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