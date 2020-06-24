import React, {Fragment, PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
      progress: 0,
    };

    this._audioRef = createRef();
    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._handleButtonClick}
        />
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>

      </Fragment>
    );
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;
    audio.src = src;
    audio.loop = true;
    // Навешиваем обработчики на элемент audio

    // The canplaythrough event is fired when the user agent can play the media up to its end
    // without having to stop for further buffering of content.
    audio.oncanplaythrough = () => this.setState({isLoading: false});

    // The play event is fired when the paused property is changed from true to false,
    // as a result of the play method, or the autoplay attribute
    audio.onplay = () => this.setState({isPlaying: true});

    // The pause event is sent when a request to pause an activity is handled
    // and the activity has entered its paused state.
    audio.onpause = () => this.setState({isPlaying: false});

    // The timeupdate event is fired when the time indicated by the "currentTime" attribute has been updated
    audio.ontimeupdate = () => this.setState({progress: audio.currentTime});
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    return this.state.isPlaying
      ? audio.play()
      : audio.pause();
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    // Очищаем ресурсы: удаляем обработчики и сам элемент audio
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  _handleButtonClick() {
    const {onPlayButtonClick} = this.props;
    this.setState({
      isPlaying: !this.state.isPlaying
    });
    onPlayButtonClick();
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
