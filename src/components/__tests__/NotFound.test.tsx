import 'jest-styled-components';
import 'mutationobserver-shim';

import { render, screen } from '@testing-library/react';
import NotFound from 'components/NotFound';
import { shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () =>
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );

describe("NotFound Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(await screen.findAllByText(/not Found/i)).toHaveLength(1);
    expect(await screen.findAllByText(/home/i)).toHaveLength(1);
    expect(await screen.findAllByText(/404/i)).toHaveLength(1);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
