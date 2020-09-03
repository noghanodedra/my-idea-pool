import 'jest-styled-components';
import 'mutationobserver-shim';

import { render, screen } from '@testing-library/react';
import { SideBar } from 'components/SideBar';
import { UserProvider } from 'contexts/UserContext';
import { shallow } from 'enzyme';
import React from 'react';
import Theme from 'Theme';

const renderComponent = () =>
  render(
    <Theme>
      <UserProvider>
        <SideBar />
      </UserProvider>
    </Theme>
  );

describe("SideBar Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(await screen.findAllByText(/The Idea Pool/i)).toHaveLength(1);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <Theme>
        <SideBar />
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
