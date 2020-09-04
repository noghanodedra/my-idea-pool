import 'jest-styled-components';
import 'mutationobserver-shim';

import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';

import Header from '../Header';

const renderComponent = () =>
  render(
    <table>
      <thead>
        <Header />
      </thead>
    </table>
  );

describe("Header Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(await screen.findAllByText(/Impact/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Avg./i)).toHaveLength(1);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
