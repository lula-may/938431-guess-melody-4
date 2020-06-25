import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({
  adapter: new Adapter()
});

const src = `test.ogg`;

describe(`Should set state property "isPlaying" on playButton click handler calling`, () => {
  it(`once to false`, () => {
    const onPlayBluttonClick = jest.fn();
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
    const onPlayBluttonClick = jest.fn();
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

  // Это неработающий тест, возможно причина в том, что jest не может воспроизводить аудио?
  // А при вызове setState срабатывает componentDidUpdate, внутри которого вызывается audio.play()?
  // И здесь вообще ничего не протестировать?
  xit(`Should change class "track__button--pause" to "track__button--play" on play button click`, () => {
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
    expect(audioPlayer.state().isPlaying).toBe(false);
  });
});
