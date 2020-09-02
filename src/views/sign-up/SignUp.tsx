import { AUTH_DETAILS } from 'constants/common.constants';
import React from 'react';
import { useForm } from 'react-hook-form';
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

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    const onSignUp = async (email:string, name:string, password:string) => {
      try {
        const response = await userService.signUp(
          email,
          name,
          password
        );
        sessionStorage.removeItem(AUTH_DETAILS);
        sessionStorage.setItem(AUTH_DETAILS, JSON.stringify(response.data));
        history.push("/ideas");
      } catch (e) {
        console.log(e);
      }
    }

    const onSubmit = (data: any) => {
      console.log("Data submitted: ", data);
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
}

export default SignUp;