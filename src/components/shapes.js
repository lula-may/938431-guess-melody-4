import PropTypes from "prop-types";
import {GameType} from "../const";

const artistQuestionShape = {
  type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  answers: PropTypes.arrayOf(
      PropTypes.shape({
        artist: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })).isRequired
};

export {artistQuestionShape};
