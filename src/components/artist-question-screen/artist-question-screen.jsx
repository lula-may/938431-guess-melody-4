import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";
import {artistQuestionShape} from "../shapes";

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true
    };
    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  render() {
    const {onAnswer, question} = this.props;
    const {
      song,
      answers
    } = question;
    const {isPlaying} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              isPlaying={isPlaying}
              src={song.src}
              onPlayButtonClick={this._handlePlayButtonClick}
            />
          </div>
        </div>

        <form className="game__artist">

          {answers.map((answer) => {
            return (
              <div key={answer.id} className="artist">
                <input className="artist__input visually-hidden" type="radio" name="answer" value={answer.id}
                  id={answer.id}
                  onChange={(evt) => {
                    evt.preventDefault();
                    onAnswer(question, answer);
                  }}
                />
                <label className="artist__name" htmlFor={answer.id}>
                  <img className="artist__picture" src={answer.avatar} alt={answer.artist}/>
                  {answer.artist}
                </label>
              </div>
            );
          })}

        </form>
      </section>
    );
  }

  _handlePlayButtonClick() {
    const {isPlaying} = this.state;

    this.setState({isPlaying: !isPlaying});
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape(artistQuestionShape).isRequired
};

export default ArtistQuestionScreen;
