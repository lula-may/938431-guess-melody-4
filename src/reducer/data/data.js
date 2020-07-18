import {extend} from "../../utils.js";
import adapter from "../../adapter.js";

const initialState = {
  questions: [],
  isLoading: false,
  hasErrors: false,
  error: undefined,
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  START_LOADING: `START_LOADING`,
  END_LOADING: `END_LOADING`,
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
    payload: null,
  }),

  endLoading: () => ({
    type: ActionType.END_LOADING,
    payload: null,
  }),

  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error.message,
  })

};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    return api.get(`/questions`)
    .then((response) => {
      dispatch(ActionCreator.loadQuestions(adapter(response.data)));
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.endLoading());
      dispatch(ActionCreator.setError(err));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      const questions = action.payload;
      return extend(state, {questions});

    case ActionType.START_LOADING:
      return extend(state, {
        isLoading: true,
      });

    case ActionType.END_LOADING:
      return extend(state, {
        isLoading: false,
      });

    case ActionType.SET_ERROR:
      return extend(state, {
        hasErrors: true,
        error: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
