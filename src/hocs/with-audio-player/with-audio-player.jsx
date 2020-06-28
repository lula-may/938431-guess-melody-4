import React, {PureComponent} from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };

      this._setActivePlayerId = this._setActivePlayerId.bind(this);
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => {
            this.id = id;
            return (
              <AudioPlayer
                src={src}
                isPlaying={id === activePlayerId}
                onPlayButtonClick={this._setActivePlayerId(id)}
              />
            );
          }}
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
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;

