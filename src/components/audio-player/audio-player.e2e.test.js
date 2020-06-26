import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({
  adapter: new Adapter()
});

const src = `test.ogg`;

it(`Should run callback on play button click`, () => {
  const onPlayBluttonClick = jest.fn();
  const audioPlayer = mount(
      <AudioPlayer
        isPlaying={true}
        onPlayButtonClick={onPlayBluttonClick}
        src={src}
      />
  );
  const playButton = audioPlayer.find(`button`);
  playButton.props().onClick();

  expect(onPlayBluttonClick).toHaveBeenCalledTimes(1);
});

describe(`Should set state property "isPlaying" on playButton click handler calling`, () => {
  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};
  const onPlayBluttonClick = jest.fn();

  it(`once to false`, () => {
    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={true}
          onPlayButtonClick={onPlayBluttonClick}
          src={src}
        />
    );
    audioPlayer.instance()._handleButtonClick();

    expect(audioPlayer.state().isPlaying).toBe(false);
  });

  it(`twice to true`, () => {
    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={true}
          onPlayButtonClick={onPlayBluttonClick}
          src={src}
        />
    );
    audioPlayer.instance()._handleButtonClick();
    audioPlayer.instance()._handleButtonClick();

    expect(audioPlayer.state().isPlaying).toBe(true);
  });
});

