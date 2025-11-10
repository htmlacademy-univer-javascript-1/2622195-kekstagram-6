import {photosList} from './main.js';

const template = document.querySelector('template#picture').content;
const container = document.querySelector('.pictures');

photosList.forEach((photo) => {
  const element = template.cloneNode(true);

  const image = element.querySelector('.picture__img');
  const likes = element.querySelector('.picture__likes');
  const comments = element.querySelector('.picture__comments');

  image.src = photo.url;
  image.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  container.appendChild(element);
});
