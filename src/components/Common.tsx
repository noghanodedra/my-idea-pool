const EmailValidation = () => ({
  required: true,
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Please enter a valid e-mail address",
  },
});

const PasswordValidation = () => ({
  required: true,
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z_@./#&+-\d]{8,}$/i,
    message:
      "Please enter a valid password. It must contain minimum 8 characters, one uppercase letter, one lowercase, one number required.",
  },
});

export { EmailValidation, PasswordValidation };
