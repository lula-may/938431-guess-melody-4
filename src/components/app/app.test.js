import React from "react";
import rerender from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app";
import {questions} from "../../test-mocks/test-questions";

const mockStore = configureStore([]);

describe(`App Component`, () => {
  it(`should render WelcomeScreen`, () => {
    const store = mockStore({
      mistakes: 0
    });
    const tree = rerender.create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
            step={-1}
          />
        </Provider>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render ArtistQuestionScreen`, () => {
    const store = mockStore({
      mistakes: 3
    });
    const tree = rerender.create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
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
      mistakes: 3
    });
    const tree = rerender.create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onAnswer={() => {}}
            onWelcomeButtonClick={() => {}}
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
});
