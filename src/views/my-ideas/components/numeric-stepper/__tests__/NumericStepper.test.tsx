import 'jest-styled-components';
import 'mutationobserver-shim';

import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';

import NumericStepper from '../NumericStepper';


const renderComponent = () =>
  render(
    <NumericStepper min={1} max={10} defaultValue={8}/>
  );

describe("Numeric Stepper Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(
      await screen.getByText(
        (content, element) => element.tagName.toLowerCase() === "span"
      )
    ).toBeDefined();
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "b"
      )
    ).toHaveLength(2);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <NumericStepper min={1} max={10} defaultValue={8} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("shoule set proper default value", async () => {
    expect(
      await screen.getByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveValue("8");
  });
  
});
