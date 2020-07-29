import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import GameOverScreen from "./game-over-screen.jsx";
import history from "../../history.js";

describe(`GameOverScreen Component`, () => {
  it(`should correctly render GameOverScreen`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <GameOverScreen
            onReplayButtonClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
