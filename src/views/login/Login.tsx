import { AUTH_DETAILS } from 'constants/common.constants';
import React from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login(
        email,
        password
      );
      console.log(response.data);
      sessionStorage.removeItem(AUTH_DETAILS);
      sessionStorage.setItem(AUTH_DETAILS, JSON.stringify(response.data));
      history.replace("/ideas");
    } catch(e) {
    }
  };

  const onSubmit = (data:any) => {
    console.log("Data submitted: ", data);
    onLogin(data.email, data.password);
  }
  
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
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid e-mail address",
              },
            })}
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                message:
                  "Please enter a valid password. It must contain minimum 8 characters, one uppercase letter, one lowercase, one number required.",
              },
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="invalid">This is required</p>
          )}
          {errors.password && (
            <p className="invalid">{errors.password.message}</p>
          )}
          <StyledButtonContainer>
            <DefaultStyledPrimaryButton type="submit">
              LOG IN
            </DefaultStyledPrimaryButton>
            <div>
              Don't have an account ?
              <DefaultStyledLink onClick={()=>history.replace('/signup')}>&nbsp;Create an account</DefaultStyledLink>
            </div>
          </StyledButtonContainer>
        </DefaultStyledForm>
      </DefaultStyledFormContainer>
    );
}

export default Login;