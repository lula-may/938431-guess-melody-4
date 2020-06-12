import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreeen from "./welcome-screen";

const errorsAmount = 10;

it(`WelcomeScreen should render 10`, () => {
  const tree = renderer.create(
      <WelcomeScreeen
        errorsAmount={errorsAmount}
      />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
