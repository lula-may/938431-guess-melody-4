const questions = [
  {
    type: `singer`,
    song: {
      singer: `Lady Gaga`,
      src: `https://upload.wikimedia.org/wikipedia/en/c/cb/Lady_Gaga.ogg`
    },
    answers: [
      {
        singer: `Lady Gaga`,
        avatar: `https://upload.wikimedia.org/images/Lady_Gaga.jpg`,
        id: `0`
      },
      {
        singer: `Witney Houston`,
        avatar: `https://upload.wikimedia.org/images/Witnew_Houston.jpg`,
        id: `1`
      },
      {
        singer: `Cher`,
        avatar: `https://upload.wikimedia.org/images/Cher.jpg`,
        id: `2`
      }
    ]
  },
  {
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/samples/1.ogg`,
        genre: `blues`,
        id: `3`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/samples/2.ogg`,
        genre: `jazz`,
        id: `4`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/samples/3.ogg`,
        genre: `folk`,
        id: `5`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/samples/.ogg`,
        genre: `jazz`,
        id: `6`
      }
    ]
  }
];

export {questions};
