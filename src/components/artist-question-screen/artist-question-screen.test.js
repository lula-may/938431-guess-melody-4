import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";
import {questions} from "../../test-mocks/test-questions";

const question = questions[0];

it(`Should render ArtistQuestionScreen`, () => {
  const tree = renderer.create(
      <ArtistQuestionScreen
        onAnswer={() => {}}
        question={question}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

