import React from "react";
import rerender from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app";
import {questions} from "../../test-mocks/test-questions";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

describe(`App Component`, () => {
  it(`should render WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
      [NameSpace.DATA]: {
        error: undefined,
        isLoading: false,
        hasErrors: false
      },
    });

    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasErrors={false}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={-1}
          />
        </Provider>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render ArtistQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }});
    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasErrors={false}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={0}
          />
        </Provider>,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render GenreQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }});
    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasErrors={false}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={1}
          />
        </Provider>,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render GameOverScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      }});
    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasErrors={false}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={3}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={4}
          />
        </Provider>,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render WinScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 2,
      }});
    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`AUTH`}
            hasErrors={false}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={2}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={3}
          />
        </Provider>,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render ErrorScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        error: `error message`,
      }});
    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            error={`error message`}
            hasErrors={true}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={2}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={3}
          />
        </Provider>,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render AuthScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 2,
      }});
    const tree = rerender.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasErrors={false}
            isLoading={false}
            login={() => {}}
            maxMistakes={3}
            mistakes={2}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            resetGame={() => {}}
            step={3}
          />
        </Provider>,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
