import {isKeyEscape, removeAllChildren} from './utils.js';

const body = document.querySelector('body');
const commentTemplate = document.querySelector('template#comment').content;
const modalCloseButton = document.getElementById('picture-cancel');

const previewContainer = document.querySelector('.big-picture');
const image = previewContainer.querySelector('.big-picture__img img');
const description = previewContainer.querySelector('.social__caption');
const likesCount = previewContainer.querySelector('.likes-count');
const commentsCount = previewContainer.querySelector('.comments-count');
const commentsContainer = previewContainer.querySelector('.social__comments');

const commentsCounter = previewContainer.querySelector('.social__comment-count');
const commentsLoader = previewContainer.querySelector('.comments-loader');

const openPreviewModal = () => {
  previewContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const closePreviewModal = () => {
  previewContainer.classList.add('hidden');
  body.classList.remove('modal-open');
};

const insertComment = (comment) => {
  const element = commentTemplate.cloneNode(true);

  const avatar = element.querySelector('.social__picture');
  const text = element.querySelector('.social__text');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  text.textContent = comment.message;

  commentsContainer.appendChild(element);
};

const preparePreview = (photo) => {
  image.src = photo.url;
  description.textContent = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length.toString();

  removeAllChildren(commentsContainer);
  photo.comments.forEach(insertComment);
};

export const photoMiniatureClickListener = (photo) => {
  preparePreview(photo);
  openPreviewModal();
};

modalCloseButton.addEventListener('click', closePreviewModal);

document.addEventListener('keydown', (event) => {
  if (isKeyEscape(event.key)) {
    closePreviewModal();
  }
});
