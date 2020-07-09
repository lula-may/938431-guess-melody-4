import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {

  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
        progress: 0,
      };
      this._audioRef = createRef();
      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }
    render() {
      const {isLoading} = this.state;
      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          onPlayButtonClick={this._handlePlayButtonClick}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;
      audio.src = src;
      audio.loop = true;
      audio.oncanplaythrough = () => this.setState({isLoading: false});
      audio.onplay = () => this.setState({isPlaying: true});
      audio.onpause = () => this.setState({isPlaying: false});
      audio.ontimeupdate = () => this.setState({progress: audio.currentTime});
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    _handlePlayButtonClick() {
      const {onPlayButtonClick} = this.props;
      const {isPlaying} = this.state;
      this.setState({
        isPlaying: !isPlaying
      });
      onPlayButtonClick();
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;

