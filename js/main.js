const getRandomIntFromRange = (start, end) => {
  const lower = Math.ceil(Math.min(start, end));
  const upper = Math.floor(Math.max(start, end));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

function getPhotoIdGenerator() {
  let id = 0;
  return () => ++id;
}
const generatePhotoId = getPhotoIdGenerator();

const getPhotoUrl = (id) => `photos/${id}.jpg`;

const getPhotoDescription = () => {
  const ADJECTIVE = [
    'Классное',
    'Чудесное',
    'Невероятное',
    'Незабываемое',
    'Умопомрачительное',
    'Сногсшибательное',
  ];
  const NOUNS = [
    'фото',
    'место',
    'событие',
    'воспоминание',
  ];

  return `${getRandomElement(ADJECTIVE)} ${getRandomElement(NOUNS)}`;
};

function getCommentIdGenerator() {
  let id = 0;
  return () => ++id;
}
const generateCommentId = getCommentIdGenerator();

const getCommentAuthorAvatar = () => `img/avatar-${getRandomIntFromRange(1, 6)}.svg`;

const getCommentMessage = () => {
  const PHRASES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  let message = getRandomElement(PHRASES);

  if (Math.random() < 0.5) {
    const anotherPhrase = getRandomElement(PHRASES);
    if (message !== anotherPhrase) {
      message += ` ${anotherPhrase}`;
    }
  }

  return message;
};

const getCommentAuthorName = () => {
  const NAMES = [
    'Иван',
    'Хуан',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

  return getRandomElement(NAMES);
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: getCommentAuthorAvatar(),
  message: getCommentMessage(),
  name: getCommentAuthorName()
});

const createPhoto = (id = generatePhotoId()) => ({
  id: id,
  url: getPhotoUrl(id),
  description: getPhotoDescription(),
  likes: getRandomIntFromRange(15, 200),
  comments: Array.from({length: getRandomIntFromRange(0, 30)}, createComment)
});

const photosList = Array.from({length: 25}, createPhoto);

console.log(photosList);

