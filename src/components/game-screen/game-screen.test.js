import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen.jsx";
import {GameType} from "../../const";
import history from "../../history.js";

const children = <div className="children-component"></div>;

describe(`GameScreen Component`, () => {
  it(`should render ArtistQuestionScreen`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <GameScreen
            goToWelcome={() => {}}
            type={GameType.ARTIST}
            mistakes={3}
          >
            {children}
          </GameScreen>

        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render GenreQuestionScreen`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <GameScreen
            goToWelcome={() => {}}
            type={GameType.GENRE}
            mistakes={3}
          >
            {children}
          </GameScreen>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
