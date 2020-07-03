import React from "react";
import rerender from "react-test-renderer";
import {App} from "./app";
import {questions} from "../../test-mocks/test-questions";

describe(`App Component`, () => {
  it(`should render WellcomeScreen`, () => {
    const tree = rerender.create(
        <App
          errorsCount={3}
          questions={questions}
          onAnswer={() => {}}
          onWelcomeButtonClick={() => {}}
          step={-1}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render ArtistQuestionScreen`, () => {
    const tree = rerender.create(
        <App
          errorsCount={3}
          questions={questions}
          onAnswer={() => {}}
          onWelcomeButtonClick={() => {}}
          step={0}
        />,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render GenreQuestionScreen`, () => {
    const tree = rerender.create(
        <App
          errorsCount={3}
          questions={questions}
          onAnswer={() => {}}
          onWelcomeButtonClick={() => {}}
          step={1}
        />,
        {createNodeMock: () => {
          return {};
        }}
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
