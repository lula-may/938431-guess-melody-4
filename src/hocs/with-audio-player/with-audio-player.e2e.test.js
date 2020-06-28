import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";
import withActivePlayer from "./with-audio-player.jsx";
import PropTypes from "prop-types";

configure({
  adapter: new Adapter()
});

const src = `test.ogg`;
const id = 2;

describe(`WithAudioPlayer HOC`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`should set state property "activePlayerId" to id on playButton click and toggle playButton from "play" to "pause"`, () =>{
    const MockComponent = ({renderPlayer}) => {
      return (
        <div>
          {renderPlayer(src, id)}
        </div>
      );
    };

    const WithAudioPlayer = withActivePlayer(MockComponent);

    const mockComponentWrapped = mount(
        <WithAudioPlayer/>
    );

    const player = mockComponentWrapped.find(AudioPlayer);
    const playButton = mockComponentWrapped.find(`button`);
    player.setState({isLoading: false});

    playButton.simulate(`click`, {});
    expect(mockComponentWrapped.state().activePlayerId).toBe(id);
    expect(playButton.getDOMNode().className).toContain(`track__button--pause`);

    playButton.simulate(`click`, {});
    expect(playButton.getDOMNode().className).toContain(`track__button--play`);

    MockComponent.propTypes = PropTypes.func;
  });

});
