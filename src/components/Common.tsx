import React from 'react';
import { useForm } from 'react-hook-form';

import { DefaultStyledInput } from './BaseComponents';

const Email = () => {
    const { register, errors } = useForm();
    return (
        <>
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
          </>
    )
}

const Password = () => {
  const { register, errors } = useForm();
  return (
    <>
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
      {errors.password && <p className="invalid">{errors.password.message}</p>}
    </>
  );
};

const FullName = () => {
  const { register, errors } = useForm();
  return (
    <>
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
    </>
  );
};

export { Email, Password, FullName };
