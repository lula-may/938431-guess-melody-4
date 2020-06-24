import React from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";
import {artistQuestionShape} from "../shapes";

const ArtistQuestionScreen = (props) => {
  const {onAnswer, question} = props;
  const {
    song,
    answers
  } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <AudioPlayer
            isPlaying={true}
            src={song.src}
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
};

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape(artistQuestionShape).isRequired
};

export default ArtistQuestionScreen;
