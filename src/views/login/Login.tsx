import { EmailValidation } from 'components/Common';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { authService } from 'services/auth-service';
import { TokenStorage } from 'services/token-storage-service';
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
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onLogin = async (data: any) => {
    try {
      const response = await authService.login(data.email, data.password);
      TokenStorage.clear();
      TokenStorage.storeRefreshToken(response.data.refresh_token);
      TokenStorage.storeToken(response.data.jwt);
      history.replace("/ideas");
    } catch (e) {}
  };

  TokenStorage.clear();

  return (
    <DefaultStyledFormContainer>
      <StyledFormHeader>Log In</StyledFormHeader>
      <DefaultStyledForm method="post" onSubmit={handleSubmit(onLogin)}>
        <DefaultStyledInput
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          aria-invalid={errors.email ? "true" : "false"}
          ref={register(EmailValidation())}
        />
        {errors.email && errors.email.type === "required" && (
          <p role="alert" className="invalid">
            This is required
          </p>
        )}
        {errors.email && errors.email.message && (
          <p role="alert" className="invalid">
            {errors.email.message}
          </p>
        )}
        <DefaultStyledInput
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          aria-invalid={errors.password ? "true" : "false"}
          ref={register({
            required: true,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p role="alert" className="invalid">
            This is required
          </p>
        )}
        <StyledButtonContainer>
          <DefaultStyledPrimaryButton role="button" type="submit">
            LOG IN
          </DefaultStyledPrimaryButton>
          <div>
            Don't have an account ?
            <DefaultStyledLink onClick={() => history.replace("/signup")}>
              &nbsp;Create an account
            </DefaultStyledLink>
          </div>
        </StyledButtonContainer>
      </DefaultStyledForm>
    </DefaultStyledFormContainer>
  );
};

export default Login;
