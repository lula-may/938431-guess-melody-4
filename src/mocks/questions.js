const AVATAR_URL = `https://api.adorable.io/avatars`;
const MAX_NUMBER = 10;
const MIN_NUMBER = 1;

const getRandomInteger = (min, max) => Math.round(Math.random() * (max - min) + min);

export default [
  {
    type: `singer`,
    song: {
      singer: `Dire Straits`,
      src: `https://upload.wikimedia.org/wikipedia/en/c/cb/Dire_Straits_-_Money_for_Nothing.ogg`
    },
    answers: [
      {
        singer: `Chris Rea`,
        avatar: `${AVATAR_URL}/${getRandomInteger(MIN_NUMBER, MAX_NUMBER)}`,
        id: `singer0`
      },
      {
        singer: `Dire Straits`,
        avatar: `${AVATAR_URL}/${getRandomInteger(MIN_NUMBER, MAX_NUMBER)}`,
        id: `singer1`
      },
      {
        singer: `Joe Cocker`,
        avatar: `${AVATAR_URL}/${getRandomInteger(MIN_NUMBER, MAX_NUMBER)}`,
        id: `singer2`
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
