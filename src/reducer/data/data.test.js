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
    }, {
      type: ActionType.START_LOADING,
    })).toEqual({
      questions: [],
      isLoading: true,
      hasErrors: false,
    });
  });

  it(`should set isLoading: false when end loading action supplied`, () => {
    expect(reducer({
      questions: [],
      isLoading: true,
      hasErrors: false,
    }, {
      type: ActionType.END_LOADING,
    })).toEqual({
      questions: [],
      isLoading: false,
      hasErrors: false,
    });
  });

  it(`should set error when set error action supplied`, () => {
    expect(reducer({
      questions: [],
      isLoading: false,
      hasErrors: false,
    }, {
      type: ActionType.SET_ERROR,
      payload: true,
    })).toEqual({
      questions: [],
      isLoading: false,
      hasErrors: true,
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
    });
  });

  it(`should return correct action for end loading`, () => {
    expect(ActionCreator.endLoading()).toEqual({
      type: ActionType.END_LOADING,
    });
  });

  it(`should return correct action for error setting`, () => {
    expect(ActionCreator.setError(true)).toEqual({
      type: ActionType.SET_ERROR,
      payload: true,
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
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.END_LOADING,
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
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: false,
        });

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.END_LOADING,
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: true,
        });
      });
  });
});
