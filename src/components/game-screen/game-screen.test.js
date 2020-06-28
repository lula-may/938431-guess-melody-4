import React from "react";
import renderer from "react-test-renderer";
import GameScreen from "./game-screen.jsx";
import {GameType} from "../../const";

const children = <div className="children-component"></div>;

describe(`Should correctly render GameScreen`, () => {
  it(`whith type GameType.ARTIST`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.ARTIST}
        >
          {children}
        </GameScreen>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`whith type GameType.GENRE`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.GENRE}
        >
          {children}
        </GameScreen>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
