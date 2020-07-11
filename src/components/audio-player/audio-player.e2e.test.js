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

  it(`should run callback on play button click`, () => {
    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={true}
          isLoading={false}
          onPlayButtonClick={onPlayBluttonClick}
          src={src}
        >
          <div/>
        </AudioPlayer>
    );
    const playButton = audioPlayer.find(`.track__button`);
    playButton.simulate(`click`);

    expect(onPlayBluttonClick).toHaveBeenCalledTimes(1);
  });
});

