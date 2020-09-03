import { EmailValidation, PasswordValidation } from 'components/Common';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TokenStorage } from 'services/token-storage-service';
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
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onSignUp = async (email: string, name: string, password: string) => {
    try {
      const response = await userService.signUp(email, name, password);
      TokenStorage.clear();
      TokenStorage.storeRefreshToken(response.data.refresh_token);
      TokenStorage.storeToken(response.data.jwt);
      history.push("/ideas");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (data: any) => {
    onSignUp(data.email, data.name, data.password);
  };

  return (
    <DefaultStyledFormContainer>
      <StyledFormHeader>Sign Up</StyledFormHeader>
      <DefaultStyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
        <DefaultStyledInput
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Full name"
          aria-invalid={errors.name ? "true" : "false"}
          ref={register({
            required: true,
          })}
        />
        {errors.name && errors.name.type === "required" && (
          <p className="invalid">This is required</p>
        )}
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
          ref={register(PasswordValidation())}
        />
        {errors.password && errors.password.type === "required" && (
          <p className="invalid">This is required</p>
        )}
        {errors.password && (
          <p className="invalid">{errors.password.message}</p>
        )}
        <StyledButtonContainer>
          <DefaultStyledPrimaryButton type="submit">
            SIGN UP
          </DefaultStyledPrimaryButton>
          <div>
            Already have account ?
            <DefaultStyledLink onClick={() => history.replace("/login")}>
              &nbsp;Log in
            </DefaultStyledLink>
          </div>
        </StyledButtonContainer>
      </DefaultStyledForm>
    </DefaultStyledFormContainer>
  );
};

export default SignUp;
