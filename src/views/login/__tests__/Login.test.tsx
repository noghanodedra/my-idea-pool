import 'jest-styled-components';
import 'mutationobserver-shim';

import { fireEvent, render, screen, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { authService } from 'services/auth-service';
import { TokenStorage } from 'services/token-storage-service';

import { Login } from '..';
import Theme from '../../../Theme';

const renderComponent = () =>
  render(
    <Theme>
      <Login />
    </Theme>
  );

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Login Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(await screen.findAllByText(/Create an account/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Log in/i)).toHaveLength(2);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <Theme>
        <Login />
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should display required error when values are invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });

  it("should display matching error when email is invalid", async () => {
    const emailValue = "test";
    const passwordValue = "Test@1234";

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
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
  });

  it("should display matching error when password is empty", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "";

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
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
  });

  it("should display no error when all fields are valid", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "Test@124";

    TokenStorage.clear = jest.fn();
    TokenStorage.storeRefreshToken = jest.fn().mockImplementation((a) => a);
    TokenStorage.storeToken = jest.fn().mockImplementation((a) => a);

    authService.login = jest
      .fn()
      .mockImplementation((a) => ({
        data: { refresh_token: "test", jwt: "test" },
      }));
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

    expect(TokenStorage.clear).toHaveBeenCalled();
    expect(TokenStorage.storeRefreshToken).toHaveBeenCalled();
    expect(TokenStorage.storeToken).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalled();
    expect(screen.getByPlaceholderText("Email")).toHaveValue(emailValue);
    expect(screen.getByPlaceholderText("Password")).toHaveValue(passwordValue);
  });
});
