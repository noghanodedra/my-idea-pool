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

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      TokenStorage.clear();
      TokenStorage.storeRefreshToken(response.data.refresh_token);
      TokenStorage.storeToken(response.data.jwt);
      history.replace("/ideas");
    } catch (e) {}
  };

  const onSubmit = (data: any) => {
    onLogin(data.email, data.password);
  };

  TokenStorage.clear();

  return (
    <DefaultStyledFormContainer>
      <StyledFormHeader>Log In</StyledFormHeader>
      <DefaultStyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
        <DefaultStyledInput
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          aria-invalid={errors.email ? "true" : "false"}
          ref={register(EmailValidation())}
        />
        {errors.email && errors.email.type === "required" && (
          <p className="invalid">This is required</p>
        )}
        {errors.email && <p className="invalid">{errors.email.message}</p>}
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
          <p className="invalid">This is required</p>
        )}
        <StyledButtonContainer>
          <DefaultStyledPrimaryButton type="submit">
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
