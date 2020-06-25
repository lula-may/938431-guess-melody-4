import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({
  adapter: new Adapter()
});

const src = `test.ogg`;

it(`Should change class "track__button--pause" to "track__button--play" on play button click`, () => {
  const onPlayBluttonClick = jest.fn();
  const audioPlayer = mount(
      <AudioPlayer
        isPlaying={true}
        onPlayButtonClick={onPlayBluttonClick}
        src={src}
      />
  );
  let playButton = audioPlayer.find(`button`);
  playButton.simulate(`click`);

  playButton = audioPlayer.find(`button`);
  expect(playButton.hasClass(`track__button--play`)).toBe(true);
  expect(onPlayBluttonClick).toHaveBeenCalledTimes(1);
  expect(audioPlayer.state.isPlaying).toBe(false);
});
