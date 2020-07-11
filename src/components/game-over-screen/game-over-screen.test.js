import React from "react";
import renderer from "react-test-renderer";
import "./game-over-screen.jsx";
import GameOverScreen from "./game-over-screen.jsx";

describe(`GameOverScreen Component`, () => {
  it(`should correctly render GameOverScreen`, () => {
    const tree = renderer.create(
        <GameOverScreen
          onReplayButtonClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
