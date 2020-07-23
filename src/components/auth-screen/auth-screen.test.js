import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "./auth-screen.jsx";

describe(`AuthScreen`, () => {
  it(`should render correctly AuthScreen Component`, () => {
    const tree = renderer.create(
        <AuthScreen
          onReplayButtonClick={() => {}}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
