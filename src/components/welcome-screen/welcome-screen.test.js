import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreeen from "./welcome-screen";

const errorsCount = 10;

it(`WelcomeScreen should render 10`, () => {
  const tree = renderer.create(
      <WelcomeScreeen
        errorsCount={errorsCount}
        onWelcomeButtonClick={() => {}}
      />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
