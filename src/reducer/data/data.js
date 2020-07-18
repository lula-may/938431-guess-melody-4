import {extend} from "../../utils.js";
import adapter from "../../adapter.js";

const initialState = {
  questions: []
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
    .then((response) => {
      dispatch(ActionCreator.loadQuestions(adapter(response.data)));
    })
    .catch((err) => err);
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      const questions = action.payload;
      return extend(state, {questions});
  }
  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
