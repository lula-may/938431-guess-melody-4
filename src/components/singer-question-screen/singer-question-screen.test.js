import React from "react";
import renderer from "react-test-renderer";
import SingerQuestionScreen from "./singer-question-screen.jsx";

it(`Should render SingerQuestionScreen`, () => {
  const tree = renderer.create(
      <SingerQuestionScreen/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

