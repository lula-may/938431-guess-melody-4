const questions = [
  {
    type: `artist`,
    song: {
      artist: `Lady Gaga`,
      src: `https://music/Lady_Gaga.ogg`
    },
    answers: [
      {
        artist: `Lady Gaga`,
        avatar: `https://images/Lady_Gaga.jpg`,
        id: `0`
      },
      {
        artist: `Witney Houston`,
        avatar: `https://images/Witnew_Houston.jpg`,
        id: `1`
      },
      {
        artist: `Cher`,
        avatar: `https://images/Cher.jpg`,
        id: `2`
      }
    ]
  },
  {
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        src: `https://samples/1.ogg`,
        genre: `blues`,
        id: `3`
      },
      {
        src: `https://samples/2.ogg`,
        genre: `jazz`,
        id: `4`
      },
      {
        src: `https://samples/3.ogg`,
        genre: `folk`,
        id: `5`
      },
      {
        src: `https://samples/4.ogg`,
        genre: `jazz`,
        id: `6`
      }
    ]
  }
];

export {questions};
