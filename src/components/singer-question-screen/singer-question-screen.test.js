import React from "react";
import renderer from "react-test-renderer";
import SingerQuestionScreen from "./singer-question-screen.jsx";
import {questions} from "../../test-mocks/test-questions";

const question = questions[0];

it(`Should render SingerQuestionScreen`, () => {
  const tree = renderer.create(
      <SingerQuestionScreen
        onAnswer={() => {}}
        question={question}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

