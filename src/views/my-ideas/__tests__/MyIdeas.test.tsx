import 'jest-styled-components';
import 'mutationobserver-shim';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { ideaService } from 'services/idea-service';
import { userService } from 'services/user-service';
import Theme from 'Theme';

import MyIdeas from '../MyIdeas';


const renderComponent = () =>
  render(
    <Theme>
      <MyIdeas></MyIdeas>
    </Theme>
  );

describe("MyIdeas Component", () => {
  //beforeEach(() => {
  //  renderComponent();
  //});
  let container: any;

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("renders correctly", async () => {
    renderComponent();
    expect(await screen.findAllByText(/My Ideas/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Got Ideas/i)).toHaveLength(1);
     expect(
       await screen.getAllByText(
         (content, element) => element.tagName.toLowerCase() === "img"
       )
     ).toHaveLength(2);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <Theme>
        <MyIdeas></MyIdeas>
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call function 'onAdd' on plus button click", async () => {

    renderComponent();
    fireEvent.click(screen.getByAltText("addRecord"));

    expect(await screen.findAllByText(/Impact/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Ease/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Confidence/i)).toHaveLength(1);

    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "img"
      )
    ).toHaveLength(3);
  });

  it("call init functions for data", async () => {

     userService.me = jest.fn().mockImplementation(() => ({
       data: {
         name: "test",
         email: "test@test.com",
         avatar_url:
           "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
       },
     }));

     ideaService.getIdeas = jest.fn().mockImplementation((pageNumber: number=1) => ({
       data: [
         {
           id: "test",
           content: "test",
           ease: 10,
           impact: 10,
           confidence: 10,
           average: 10,
         },
       ],
     }));

     await act(async () => {
       render(
         <Theme>
           <MyIdeas></MyIdeas>
         </Theme>,
         container
       );
     });

        expect(await screen.findAllByText(/Impact/i)).toHaveLength(1);
        expect(await screen.findAllByText(/Ease/i)).toHaveLength(1);
        expect(await screen.findAllByText(/Confidence/i)).toHaveLength(1);

    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "img"
      )
    ).toHaveLength(3);
  });

  afterEach(() => {
    jest.restoreAllMocks();
      unmountComponentAtNode(container);
      container.remove();
      container = null;
  });

});
