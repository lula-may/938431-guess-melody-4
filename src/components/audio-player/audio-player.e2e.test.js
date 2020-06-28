import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({
  adapter: new Adapter()
});

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

const src = `test.ogg`;

describe(`AudioPlayer Component`, () => {
  const onPlayBluttonClick = jest.fn();

  it(`Should run callback on play button click`, () => {
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


  it(`Should set state property "isPlaying" to "false" on play button click`, () => {
    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={true}
          onPlayButtonClick={onPlayBluttonClick}
          src={src}
        />
    );
    const playButton = audioPlayer.find(`button`);

    audioPlayer.setState({isLoading: false});
    playButton.simulate(`click`);

    expect(audioPlayer.state().isPlaying).toBe(false);
  });

  it(`Should set state property "isPlaying" to "true" on play button click twice`, () => {
    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={true}
          onPlayButtonClick={onPlayBluttonClick}
          src={src}
        />
    );
    const playButton = audioPlayer.find(`button`);
    audioPlayer.setState({isLoading: false});
    playButton.simulate(`click`);
    playButton.simulate(`click`);

    expect(audioPlayer.state().isPlaying).toBe(true);
  });
});

