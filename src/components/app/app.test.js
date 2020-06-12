import React from "react";
import rerender from "react-test-renderer";
import App from "./app";

const errorsAmount = 4;

it(`App should render 4 errors`, () => {
  const tree = rerender.create(
      <App
        errorsAmount={errorsAmount}
      />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
