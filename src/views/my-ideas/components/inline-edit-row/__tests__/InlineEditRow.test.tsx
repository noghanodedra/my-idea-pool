import 'jest-styled-components';
import 'mutationobserver-shim';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Idea } from 'models/Idea';
import React from 'react';
import { ideaService } from 'services/idea-service';
import Theme from 'Theme';

import InlineEditRow from '../InlineEditRow';

const newRecord: Idea = {
  id: "",
  impact: 8,
  ease: 8,
  confidence: 9,
  content: "test",
};

const persistentRecord: Idea = {
  id: "1awewe",
  impact: 8,
  ease: 8,
  confidence: 8,
  content: "test",
  average: 8,
};

const renderComponent = async (record: Idea) =>
  await act(async () => {
    render(
      <Theme>
        <table>
          <tbody>
            <InlineEditRow
              record={record}
              recordsLoaderFn={jest.fn()}
              removeInlineEditFn={jest.fn()}
            />
          </tbody>
        </table>
      </Theme>
    );
  });

describe("InlineEditRow Component", () => {
  beforeEach(async () => {
    ideaService.deleteIdea = jest.fn().mockImplementation((a) => a);
    ideaService.updateIdea = jest.fn().mockImplementation((a, b, c, d, e) => a);
    ideaService.createIdea = jest.fn().mockImplementation((a, b, c, d) => a);
  });

  it("renders correctly - edit mode", async () => {
    await renderComponent(newRecord);
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

  it("renders correctly - row mode", async () => {
    await renderComponent(persistentRecord);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "td"
      )
    ).toHaveLength(7);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "img"
      )
    ).toHaveLength(2);
    expect(await screen.findAllByText(/test/i)).toHaveLength(1);
    expect(await screen.findAllByText(/8/i)).toHaveLength(4);
  });

  it("is styled correctly - edit mode", () => {
    const wrapper = shallow(
      <Theme>
        <InlineEditRow record={newRecord} recordsLoaderFn={jest.fn} />
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("is styled correctly - row mode", () => {
    const wrapper = shallow(
      <Theme>
        <InlineEditRow record={persistentRecord} recordsLoaderFn={jest.fn} />
      </Theme>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("shows confirm dialog on 'delete' button click", async () => {
    await renderComponent(persistentRecord);

    fireEvent.click(screen.getByAltText("Remove Record"));

    expect(await screen.findAllByText(/are you/i)).toHaveLength(1);
    expect(await screen.findAllByText(/delete/i)).toHaveLength(1);
    expect(await screen.findAllByText(/cancel/i)).toHaveLength(1);
    expect(await screen.findAllByText(/ok/i)).toHaveLength(1);
  });

  it("should call delete function on 'delete' button click", async () => {
    await renderComponent(persistentRecord);

    fireEvent.click(screen.getByAltText("Remove Record"));

    expect(await screen.findAllByText(/ok/i)).toHaveLength(1);

    fireEvent.click(screen.getByText(/ok/i));

    expect(ideaService.deleteIdea).toHaveBeenCalled();
  });

  it("should show row in 'edit' mode on 'edit' button click", async () => {
    await renderComponent(persistentRecord);

    fireEvent.click(screen.getByAltText("Edit Record"));

    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);
  });

  it("should move to row mode from 'edit' mode on 'cancel' button click", async () => {
    await renderComponent(persistentRecord);

    fireEvent.click(screen.getByAltText("Edit Record"));

    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);

    fireEvent.click(screen.getByAltText("Cancel Update"));

    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "td"
      )
    ).toHaveLength(7);
  });

  it("should show required validation message for empty 'content' input on 'confirm' button click", async () => {
    await renderComponent(newRecord);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);

    fireEvent.input(screen.getByPlaceholderText("Content"), {
      target: {
        value: "",
      },
    });

    fireEvent.click(screen.getByAltText("Save Record"));

    expect(await screen.findAllByText(/required/i)).toHaveLength(1);
  });

  it("should show max length validation message for more than 255 chars in 'content' input on 'confirm' button click", async () => {
    await renderComponent(newRecord);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);

    fireEvent.input(screen.getByPlaceholderText("Content"), {
      target: {
        value:
          "123445545353535353dgdghgfsdfggsfgsfgfgdfgdgsdgdsfgdfgdsgfdgdgdgdfgdgdsgfgsdgdgdgdfgdgfgdfggfksndfsfksndfksflsndfsklnfklsndlkfnslknfwerjwerjsknfsknfnsnfsnfdfsfsfsdfsdfsfwerwerwrwrwrwrwrwrwrwrwrwrwrwrwrwterdfsfsfsfwersfsdtafhsfhgdhnsfsfnsfnsnfsknfsdfksnfnkslndflsndflsnflsnflsnflsndflsknflerhehknskfkasnfsnlfnldflsnflanflsnldfnlnfslnfldsnflsdnff",
      },
    });

    fireEvent.click(screen.getByAltText("Save Record"));

    expect(
      await screen.findAllByText(/Maximum allowed characters is 255/i)
    ).toHaveLength(1);
  });

  it("should save new record on 'confirm' button click", async () => {
    await renderComponent(newRecord);
    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);

    fireEvent.input(screen.getByPlaceholderText("Content"), {
      target: {
        value: "hello",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByAltText("Save Record"));
    });

    expect(ideaService.createIdea).toHaveBeenCalled();
  });

  it("should update persistent record on 'confirm' button click", async () => {
    await renderComponent(persistentRecord);

    fireEvent.click(screen.getByAltText("Edit Record"));

    expect(
      await screen.getAllByText(
        (content, element) => element.tagName.toLowerCase() === "input"
      )
    ).toHaveLength(4);

    fireEvent.input(screen.getByPlaceholderText("Content"), {
      target: {
        value: "hello",
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByAltText("Save Record"));
    });

    expect(ideaService.updateIdea).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
