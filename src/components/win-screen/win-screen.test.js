import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import history from "../../history.js";
import WinScreen from "./win-screen.jsx";

const correctAnswersCount = 4;
const mistakesCount = 2;

describe(`WinScreen Component`, () => {
  it(`should rendrer correctly WinScreen`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <WinScreen
            correctAnswersCount={correctAnswersCount}
            mistakesCount={mistakesCount}
            onReplayButtonClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
