import React from "react";
import rerender from "react-test-renderer";
import App from "./app";
import {questions} from "../../test-mocks/test-questions";

const errorsCount = 4;

it(`App should render 4 errors`, () => {
  const tree = rerender.create(
      <App
        errorsCount={errorsCount}
        questions={questions}
      />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
