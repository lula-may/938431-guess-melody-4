import React from "react";
import renderer from "react-test-renderer";
import WinScreen from "./win-screen.jsx";

const correctAnswersCount = 4;
const mistakesCount = 2;

describe(`WinScreen Component`, () => {
  it(`should rendrer correctly WinScreen`, () => {
    const tree = renderer.create(
        <WinScreen
          correctAnswersCount={correctAnswersCount}
          mistakesCount={mistakesCount}
          onReplayButtonClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
