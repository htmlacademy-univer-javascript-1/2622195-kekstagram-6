import {getRandomElement, getRandomIntFromRange} from './utils';
import {ADJECTIVE, NAMES, NOUN, PHRASES} from './const';

function getPhotoIdGenerator() {
  let id = 0;
  return () => ++id;
}
const generatePhotoId = getPhotoIdGenerator();

const getPhotoUrl = (id) => `photos/${id}.jpg`;

const getPhotoDescription = () => `${getRandomElement(ADJECTIVE)} ${getRandomElement(NOUN)}`;

function getCommentIdGenerator() {
  let id = 0;
  return () => ++id;
}
const generateCommentId = getCommentIdGenerator();

const getCommentAuthorAvatar = () => `img/avatar-${getRandomIntFromRange(1, 6)}.svg`;

const getCommentMessage = () => {
  let message = getRandomElement(PHRASES);

  if (Math.random() < 0.5) {
    const anotherPhrase = getRandomElement(PHRASES);
    if (message !== anotherPhrase) {
      message += ` ${anotherPhrase}`;
    }
  }

  return message;
};

const getCommentAuthorName = () => getRandomElement(NAMES);

const createComment = () => ({
  id: generateCommentId(),
  avatar: getCommentAuthorAvatar(),
  message: getCommentMessage(),
  name: getCommentAuthorName()
});

export const createPhoto = (id = generatePhotoId()) => ({
  id: id,
  url: getPhotoUrl(id),
  description: getPhotoDescription(),
  likes: getRandomIntFromRange(15, 200),
  comments: Array.from({length: getRandomIntFromRange(0, 30)}, createComment)
});
