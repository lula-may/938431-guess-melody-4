import {extend} from "../../utils.js";
import adapter from "../../adapter.js";

const initialState = {
  questions: [],
  isLoading: false,
  hasErrors: false,
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
  }),

  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  setError: (hasErrors) => ({
    type: ActionType.SET_ERROR,
    payload: hasErrors,
  })

};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    dispatch(ActionCreator.setError(false));
    return api.get(`/questions`)
    .then((response) => {
      dispatch(ActionCreator.loadQuestions(adapter(response.data)));
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.endLoading());
      dispatch(ActionCreator.setError(true));
      return err;
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
        hasErrors: action.payload,
      });
  }
  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
