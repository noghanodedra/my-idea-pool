import { AUTH_DETAILS } from 'constants/common.constants';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'services/auth-service';
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

  const history = useHistory();

  const onLogin = async () => {
    try {
      const response = await authService.login(
        "email-1@test.com",
        "the-Secret-123"
      );
      console.log(response.data);
      sessionStorage.removeItem(AUTH_DETAILS);
      sessionStorage.setItem(AUTH_DETAILS, JSON.stringify(response.data));
      setTimeout(() => {
        history.replace("/ideas");
      }, 1500);
    } catch(e) {
    }
  };
  
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
            <DefaultStyledPrimaryButton onClick={onLogin} type="button">
              LOG IN
            </DefaultStyledPrimaryButton>
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