import {extend} from "./utils.js";
import {GameType} from "./const.js";
import questions from "./mocks/questions.js";

const initialState = {
  mistakes: 0,
  step: -1,
  questions,
  maxMistakes: 3
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return question.song.artist === userAnswer.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((item, i) => {
    return item === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),

  incrementMistake: (question, answer) => {
    let isCorrectAnswer = false;
    switch (question.type) {
      case GameType.ARTIST:
        isCorrectAnswer = isArtistAnswerCorrect(question, answer);
        break;
      case GameType.GENRE:
        isCorrectAnswer = isGenreAnswerCorrect(question, answer);
        break;
    }
    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isCorrectAnswer ? 0 : 1
    };
  },

  resetGame: () => {
    return {
      type: ActionType.RESET,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;
      return extend(state, {mistakes});

    case ActionType.INCREMENT_STEP:
      const nextStep = state.step + action.payload;
      return extend(state, {
        step: nextStep
      });

    case ActionType.RESET:
      return extend(initialState, {
        step: 0,
      });
  }
  return state;
};

export {reducer, ActionCreator, ActionType};
