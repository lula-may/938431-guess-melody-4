import React from "react";
import renderer from "react-test-renderer";
import "./error-screen.jsx";
import ErrorScreen from "./error-screen.jsx";

describe(`ErrorScreen Component`, () => {
  it(`should correctly render ErrorScreen`, () => {
    const tree = renderer.create(
        <ErrorScreen/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
