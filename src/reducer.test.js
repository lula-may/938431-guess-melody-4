import {reducer, ActionCreator, ActionType} from "./reducer.js";

describe(`Reducer`, () => {
  it(`should return initialState on empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      mistakes: 0,
      step: -1
    });
  });

  it(`should increment current step by passed value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    }
    )).toEqual({
      mistakes: 0,
      step: 0,
    });

    expect(reducer({
      mistakes: 1,
      step: 1,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 1,
      step: 1,
    });
  });

  it(`should increment mistakes count by passed value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 1,
      step: -1,
    });

    expect(reducer({
      mistakes: 10,
      step: 10,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 10,
    })).toEqual({
      mistakes: 20,
      step: 10,
    });
  });

});

describe(`ActionCreator`, () => {
  it(`should return correct action for step increment`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`should return action with payload 0 for mistakes increment on user's correct answering artist question`, () => {
    const question = {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          avatar: ``,
          id: `artist0`
        },
        {
          artist: `incorrect-1`,
          avatar: ``,
          id: `artist1`
        },
        {
          artist: `incorrect-2`,
          avatar: ``,
          id: `artist2`
        }
      ]
    };

    const correctAnswer = {
      artist: `correct`,
      avatar: ``,
      id: `artist0`
    };

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`should return action with payload 1 for mistakes increment on user's wrong answering artist question`, () => {
    const question = {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          avatar: ``,
          id: `artist0`
        },
        {
          artist: `incorrect-1`,
          avatar: ``,
          id: `artist1`
        },
        {
          artist: `incorrect-2`,
          avatar: ``,
          id: `artist2`
        }
      ]
    };

    const wrongAnswer = {
      artist: `incorrect-1`,
      avatar: ``,
      id: `artist1`
    };

    expect(ActionCreator.incrementMistake(question, wrongAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`should return action with payload 0 for mistakes increment on user's correct answering genre question`, () => {
    const question = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: ``,
          genre: `blues`,
          id: `answer-3`
        },
        {
          src: ``,
          genre: `jazz`,
          id: `answer-4`
        },
        {
          src: ``,
          genre: `folk`,
          id: `answer-5`
        },
        {
          src: ``,
          genre: `jazz`,
          id: `answer-6`
        }
      ]
    };

    const correctAnswer = [false, true, false, true];

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`should return action with payload 1 for mistakes increment on user's wrong answering genre question`, () => {
    const question = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: ``,
          genre: `blues`,
          id: `answer-3`
        },
        {
          src: ``,
          genre: `jazz`,
          id: `answer-4`
        },
        {
          src: ``,
          genre: `folk`,
          id: `answer-5`
        },
        {
          src: ``,
          genre: `jazz`,
          id: `answer-6`
        }
      ]
    };

    const correctAnswer = [false, true, false, false];

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

});
