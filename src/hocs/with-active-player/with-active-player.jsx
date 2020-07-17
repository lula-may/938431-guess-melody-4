import React, {PureComponent} from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio.jsx";

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };

      this._setActivePlayerId = this._setActivePlayerId.bind(this);
      this._resetActivePlayer = this._resetActivePlayer.bind(this);
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => {
            return (
              <AudioPlayerWrapped
                src={src}
                isPlaying={id === activePlayerId}
                onPlayButtonClick={this._setActivePlayerId(id)}
              />
            );
          }}
          onQuestionChange={this._resetActivePlayer}
        />
      );
    }

    _setActivePlayerId(id) {
      const {activePlayerId} = this.state;

      return () => {
        this.setState({
          activePlayerId: activePlayerId === id ? -1 : id
        });
      };
    }

    _resetActivePlayer() {
      this.setState({
        activePlayerId: 0
      });
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;

