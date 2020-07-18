import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getLoadingState = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getErrorState = (state) => {
  return state[NAME_SPACE].hasErrors;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((question) => question.type === `artist`)
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((question) => question.type === `genre`)
);
