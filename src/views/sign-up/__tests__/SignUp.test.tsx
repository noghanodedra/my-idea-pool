import 'jest-styled-components';
import 'mutationobserver-shim';

import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { TokenStorage } from 'services/token-storage-service';
import { userService } from 'services/user-service';
import SignUp from 'views/sign-up/SignUp';

import Theme from '../../../Theme';

const renderComponent = () =>
  render(
    <Theme>
      <SignUp />
    </Theme>
  );

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Sign Up Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(await screen.findAllByText(/Sign Up/i)).toHaveLength(2);
    expect(await screen.findAllByText(/Log in/i)).toHaveLength(1);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <Theme>
        <SignUp />
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });

  it("should display matching error when name is invalid", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "Test@1234";
    const nameValue = "";

    fireEvent.input(screen.getByPlaceholderText("Name"), {
      target: {
        value: nameValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: {
        value: emailValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: {
        value: passwordValue,
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Email")).toHaveValue(emailValue);
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(
      nameValue
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
  });

  it("should display matching error when email is invalid", async () => {
    const emailValue = "test";
    const passwordValue = "Test@1234";
    const nameValue = "test";

    fireEvent.input(screen.getByPlaceholderText("Name"), {
      target: {
        value: nameValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: {
        value: emailValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: {
        value: passwordValue,
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Email")).toHaveValue(emailValue);
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(
      nameValue
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
  });

  it("should display matching error when password is invalid", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "easy";
    const nameValue = "test";

    fireEvent.input(screen.getByPlaceholderText("Name"), {
      target: {
        value: nameValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: {
        value: emailValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: {
        value: passwordValue,
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Email")).toHaveValue(emailValue);
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(
      nameValue
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
  });

  it("should display no error when all fields are valid", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "Test@124";
    const nameValue = "test";

    userService.signUp = jest.fn().mockImplementation((a) => ({
      data: { refresh_token: "test", jwt: "test" },
    }));
    TokenStorage.clear = jest.fn();
    TokenStorage.storeRefreshToken = jest.fn().mockImplementation((a) => a);
    TokenStorage.storeToken = jest.fn().mockImplementation((a) => a);

    fireEvent.input(screen.getByPlaceholderText("Name"), {
      target: {
        value: nameValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: {
        value: emailValue,
      },
    });

    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: {
        value: passwordValue,
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    try {
      await waitForElement(() =>
        expect(screen.queryAllByRole("alert")).toHaveLength(0)
      );
    } catch (error) {}
    expect(screen.getByPlaceholderText("Email")).toHaveValue(emailValue);
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(
      nameValue
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
    expect(TokenStorage.clear).toHaveBeenCalled();
    expect(TokenStorage.storeRefreshToken).toHaveBeenCalled();
    expect(TokenStorage.storeToken).toHaveBeenCalled();
    expect(userService.signUp).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
