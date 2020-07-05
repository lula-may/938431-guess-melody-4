import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

describe(`Mistakes Component`, () => {
  it(`should render correctly 0 mistakes`, () => {
    const tree = renderer.create(
        <Mistakes
          count={0}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly 3 mistakes`, () => {
    const tree = renderer.create(
        <Mistakes
          count={3}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
