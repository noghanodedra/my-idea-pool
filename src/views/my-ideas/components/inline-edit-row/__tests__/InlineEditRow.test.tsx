import 'jest-styled-components';
import 'mutationobserver-shim';

import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Idea } from 'models/Idea';
import React from 'react';
import Theme from 'Theme';

import InlineEditRow from '../InlineEditRow';

const record: Idea = {
 id: "",
 impact: 8,
 ease:8,
 confidence: 9,
 content: "test"
};

const renderComponent = () =>
  render(
    <Theme>
      <table>
        <tbody>
          <InlineEditRow record={record} recordsLoaderFn={jest.fn} />
        </tbody>
      </table>
    </Theme>
  );

describe("InlineEditRow Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", async () => {
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "img"
      )
    ).toHaveLength(2);
  });

  it("is styled correctly", () => {
    const wrapper = shallow(
      <Theme>
        <InlineEditRow record={record} recordsLoaderFn={jest.fn} />
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
