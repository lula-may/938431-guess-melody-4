import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";
import {questions} from "../../test-mocks/test-questions";

const mockSrc = questions[0].song.src;

it(`Should correctly render AudioPlayer Component`, () => {
  const tree = renderer.create(
      <AudioPlayer
        src={mockSrc}
        isPlaying={false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
