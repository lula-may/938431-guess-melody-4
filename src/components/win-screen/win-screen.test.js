import React from "react";
import renderer from "react-test-renderer";
import WinScreen from "./win-screen.jsx";

const mistakesCount = 2;
const questionsCount = 6;

describe(`WinScreen Component`, () => {
  it(`should rendrer correctly WinScreen`, () => {
    const tree = renderer.create(
        <WinScreen
          mistakesCount={mistakesCount}
          onReplayButtonClick={() => {}}
          questionsCount={questionsCount}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
