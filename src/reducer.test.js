import {reducer, ActionCreator, ActionType} from "./reducer.js";

const AVATAR_URL = `https://api.adorable.io/avatars`;
const questions = [
  {
    type: `artist`,
    song: {
      artist: `Dire Straits`,
      src: `https://upload.wikimedia.org/wikipedia/en/c/cb/Dire_Straits_-_Money_for_Nothing.ogg`
    },
    answers: [
      {
        artist: `Chris Rea`,
        avatar: `${AVATAR_URL}/1`,
        id: `artist0`
      },
      {
        artist: `Dire Straits`,
        avatar: `${AVATAR_URL}/2`,
        id: `artist1`
      },
      {
        artist: `Joe Cocker`,
        avatar: `${AVATAR_URL}/3`,
        id: `artist2`
      }
    ]
  },
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/en/a/ae/Adele_Skyfall_sample.ogg`,
        genre: `pop`,
        id: `treck0`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/3/3f/Layla_%28Acoustic%29_Sample.ogg`,
        genre: `rock`,
        id: `treck1`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/e/e1/50_Cent_-_Hustler%27s_Ambition.ogg`,
        genre: `hip hop`,
        id: `treck2`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/7/75/Queen_I_want_to_break_free.ogg`,
        genre: `rock`,
        id: `treck3`
      }
    ]
  }
];

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      maxMistakes: 3,
      mistakes: 0,
      questions,
      step: -1
    });
  });

  it(`should increment current step by passed value`, () => {
    expect(reducer({
      mistakes: 0,
      step: -1,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    }
    )).toEqual({
      mistakes: 0,
      step: 0,
      questions,
    });

    expect(reducer({
      mistakes: 1,
      step: 1,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      mistakes: 1,
      step: 1,
      questions,
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
      mistakes: 1,
      step: 1,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      mistakes: 2,
      step: 1,
    });
  });

  it(`should return default state with step=0 when RESET action supplied`, () => {
    expect(reducer({
      maxMistakes: 3,
      mistakes: 1,
      questions,
      step: questions.length,
    }, {
      type: ActionType.RESET,
      payload: null,
    })).toEqual({
      maxMistakes: 3,
      mistakes: 0,
      questions,
      step: 0,
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
    const question = questions[0];

    const correctAnswer = {
      artist: `Dire Straits`,
      avatar: `${AVATAR_URL}/2`,
      id: `artist1`
    };

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`should return action with payload 1 for mistakes increment on user's wrong answering artist question`, () => {
    const question = questions[0];

    const wrongAnswer = {
      artist: `Chris Rea`,
      avatar: `${AVATAR_URL}/1`,
      id: `artist0`
    };

    expect(ActionCreator.incrementMistake(question, wrongAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`should return action with payload 0 for mistakes increment on user's correct answering genre question`, () => {
    const question = questions[1];

    const correctAnswer = [false, true, false, true];

    expect(ActionCreator.incrementMistake(question, correctAnswer)).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`should return correct action for gameReset`, () => {
    expect(ActionCreator.resetGame()).toEqual({
      type: ActionType.RESET,
      payload: null,
    });
  });
});
