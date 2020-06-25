import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen.jsx";
import {questions} from "../../test-mocks/test-questions";

const question = questions[1];

it(`Should correctly render GenreQuestionScreen`, () => {
  const tree = renderer.create(
      <GenreQuestionScreen
        onAnswer={() => {}}
        question={question}
        renderPlayer={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
