import {reducer, ActionCreator, ActionType, Operation} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";
import {questions} from "../../test-mocks/test-questions.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      questions: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    });
  });

  it(`should update questions when load question action supplied`, () => {
    expect(reducer({
      questions: [],
    }, {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    })).toEqual({
      questions,
    });
  });

  it(`should set isLoading: true when start loading action supplied`, () => {
    expect(reducer({
      questions: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    }, {
      type: ActionType.START_LOADING,
      payload: questions,
    })).toEqual({
      questions: [],
      isLoading: true,
      hasErrors: false,
      error: undefined,
    });
  });

  it(`should set isLoading: false when end loading action supplied`, () => {
    expect(reducer({
      questions: [],
      isLoading: true,
      hasErrors: false,
      error: undefined,
    }, {
      type: ActionType.END_LOADING,
      payload: questions,
    })).toEqual({
      questions: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    });
  });

  it(`should set error when set error action supplied`, () => {
    expect(reducer({
      questions: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    }, {
      type: ActionType.SET_ERROR,
      payload: `error message`,
    })).toEqual({
      questions: [],
      isLoading: false,
      hasErrors: true,
      error: `error message`,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`should return correct action for questions loading`, () => {
    expect(ActionCreator.loadQuestions(questions)).toEqual({
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    });
  });

  it(`should return correct action for start loading`, () => {
    expect(ActionCreator.startLoading()).toEqual({
      type: ActionType.START_LOADING,
      payload: null,
    });
  });

  it(`should return correct action for end loading`, () => {
    expect(ActionCreator.endLoading()).toEqual({
      type: ActionType.END_LOADING,
      payload: null,
    });
  });

  it(`should return correct action for error setting`, () => {
    const error = {
      message: `error message`,
    };
    expect(ActionCreator.setError(error)).toEqual({
      type: ActionType.SET_ERROR,
      payload: `error message`,
    });
  });
});

describe(`Operation`, () => {
  it(`should make a correct API call to "/questions"`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionsLoader = Operation.loadQuestions();

    MockApi.onGet(`/questions`)
    .reply(200, [{fake: true}]);

    return questionsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
          payload: null,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.END_LOADING,
          payload: null,
        });
      });
  });

  it(`should catch error on API call fail`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionsLoader = Operation.loadQuestions();

    MockApi.onGet(`/questions`)
    .reply(404);

    return questionsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
          payload: null,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.END_LOADING,
          payload: null,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: `Request failed with status code 404`,
        });
      });
  });
});
