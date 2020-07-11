const AVATAR_URL = `https://api.adorable.io/avatars`;

export default [
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
        src: `https://upload.wikimedia.org/wikipedia/en/4/49/Hips_Don%27t_Lie_%28Shakira_song_-_sample%29.ogg`,
        genre: `pop`,
        id: `treck0`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/3/3f/Layla_%28Acoustic%29_Sample.ogg`,
        genre: `rock`,
        id: `treck1`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/a/ae/Adele_Skyfall_sample.ogg`,
        genre: `pop`,
        id: `treck2`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/7/75/Queen_I_want_to_break_free.ogg`,
        genre: `rock`,
        id: `treck3`
      }
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `Aerosmith`,
      src: `https://upload.wikimedia.org/wikipedia/en/f/fe/Aerosmith_-_Dream_On.ogg`,
    },
    answers: [
      {
        artist: `Aerosmith`,
        avatar: `${AVATAR_URL}/4`,
        id: `artist3`
      },
      {
        artist: `Metallica`,
        avatar: `${AVATAR_URL}/5`,
        id: `artist4`
      },
      {
        artist: `KISS`,
        avatar: `${AVATAR_URL}/6`,
        id: `artist5`
      }
    ]
  },
  {
    type: `genre`,
    genre: `rock and roll`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/ru/2/23/Michael_Jackson_%E2%80%94_Earth_Song.ogg`,
        genre: `pop`,
        id: `treck4`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/3/31/Metallica_-_The_Unforgiven.ogg`,
        genre: `rock`,
        id: `treck5`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/0/0c/She_Loves_You_%28Beatles_song_-_sample%29.ogg`,
        genre: `rock and roll`,
        id: `treck6`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/en/6/6d/Run_On_%28Elvis_Presley_song_-_sample%29.ogg`,
        genre: `rock and roll`,
        id: `treck7`
      }
    ]
  },
];
