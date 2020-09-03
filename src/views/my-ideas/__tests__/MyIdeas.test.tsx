import 'jest-styled-components';
import 'mutationobserver-shim';

import { fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import Theme from 'Theme';

import MyIdeas from '../MyIdeas';


const renderComponent = () =>
  render(
    <Theme>
      <MyIdeas></MyIdeas>
    </Theme>
  );

describe("MyIdeas Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(await screen.findAllByText(/My Ideas/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Got Ideas/i)).toHaveLength(1);
     expect(
       await screen.getAllByText(
         (content, element) => element.tagName.toLowerCase() === "img"
       )
     ).toHaveLength(1);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <Theme>
        <MyIdeas></MyIdeas>
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onAdd on plus image click", async () => {

    fireEvent.click(screen.getByAltText("addRecord"));

    expect(await screen.findAllByText(/Impact/i)).toHaveLength(1);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "img"
      )
    ).toHaveLength(3);
  });

});
