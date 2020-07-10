import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio.jsx";
import PropTypes from "prop-types";

configure({
  adapter: new Adapter()
});

describe(`WithAudioPlayer HOC`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  const MockPlayer = (props) => {
    const {children, onPlayButtonClick} = props;
    return (
      <div>
        <button onClick={onPlayButtonClick}/>
        {children}
      </div>
    );
  };

  MockPlayer.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
  };

  it(`should call audio.play on playButton click`, () =>{

    const WithAudio = withAudio(MockPlayer);

    const wrapper = mount(
        <WithAudio
          isPlaying={false}
          onPlayButtonClick={() => {}}
          src=""
        />
    );

    const {_audioRef} = wrapper.instance();

    jest.spyOn(_audioRef.current, `play`);

    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);

    expect(_audioRef.current.play).toHaveBeenCalledTimes(1);

  });

  it(`should call audio.pause on playButton click`, () =>{

    const WithAudio = withAudio(MockPlayer);

    const wrapper = mount(
        <WithAudio
          isPlaying={true}
          onPlayButtonClick={() => {}}
          src=""
        />
    );

    const {_audioRef} = wrapper.instance();

    jest.spyOn(_audioRef.current, `pause`);

    wrapper.instance().componentDidMount();
    wrapper.find(`button`).simulate(`click`);

    expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
  });
});

