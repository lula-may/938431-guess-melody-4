import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
      progress: 0,
    };

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
          <audio />
        </div>

      </Fragment>
    );
  }

  componentDidMount() {
    const {src} = this.props;

    this._audio = new Audio(src);

    // Навешиваем обработчики на элемент audio

    // The canplaythrough event is fired when the user agent can play the media up to its end
    // without having to stop for further buffering of content.
    this._audio.oncanplaythrough = () => this.setState({isLoading: false});

    // The play event is fired when the paused property is changed from true to false,
    // as a result of the play method, or the autoplay attribute
    this._audio.onplay = () => this.setState({isPlaying: true});

    // The pause event is sent when a request to pause an activity is handled
    // and the activity has entered its paused state.
    this._audio.onpause = () => this.setState({isPlaying: false});

    // The timeupdate event is fired when the time indicated by the "currentTime" attribute has been updated
    this._audio.ontimeupdate = () => this.setState({progress: this._audio.currentTime});
  }

  componentDidUpdate() {
    return this.state.isPlaying
      ? this._audio.play()
      : this._audio.pause();
  }

  componentWillUnmount() {
    // Очищаем ресурсы: удаляем обработчики и сам элемент audio
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.ontimeupdate = null;
    this._audio.src = ``;
    this._audio = null;
  }

  _handleButtonClick() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default AudioPlayer;
