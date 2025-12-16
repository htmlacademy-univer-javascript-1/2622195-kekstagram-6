import {photoMiniatureClickListener} from './fullscreen-preview.js';

const template = document.querySelector('template#picture').content;
const container = document.querySelector('.pictures');

const insertPhotoMiniature = (photo) => {
  const element = template.cloneNode(true);

  const root = element.querySelector('.picture');
  const image = element.querySelector('.picture__img');
  const likes = element.querySelector('.picture__likes');
  const comments = element.querySelector('.picture__comments');

  image.src = photo.url;
  image.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  root.addEventListener('click', (e) => {
    e.preventDefault();
    photoMiniatureClickListener(photo);
  });

  container.appendChild(element);
};

export const displayPhotos = (photosList) => {
  photosList.forEach(insertPhotoMiniature);
};
