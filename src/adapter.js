import {GameType} from "./const.js";

const addIdsToAnswers = (answers, index) => answers.map((answer, id) => Object.assign({}, answer, {id: `${index}-${id}`}));

const adapter = (questions) => questions.map((question, index) => {
  const {type, answers} = question;
  switch (type) {
    case GameType.ARTIST:
      const {song} = question;
      return ({
        type,
        song,
        answers: answers.map((answer, id) => ({
          avatar: answer.picture,
          artist: answer.artist,
          id: `${index}-${id}`,
        })),
      });
    case GameType.GENRE:
      const {genre} = question;
      return ({
        type,
        genre,
        answers: addIdsToAnswers(answers, index),
      });
    default:
      return question;
  }
});

export default adapter;
