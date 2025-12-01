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

const COMMENTS_PORTION = 5;
let loadedComments = 0;
let currentPhoto = null;

const openPreviewModal = () => {
  previewContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeClick);
};

const closePreviewModal = () => {
  previewContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  currentPhoto = null;
  loadedComments = 0;

  document.removeEventListener('keydown', onEscapeClick);
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

const renderCommentsPortion = () => {
  const total = currentPhoto.comments.length;
  const next = Math.min(total, loadedComments + COMMENTS_PORTION);

  for (let i = loadedComments; i < next; i++) {
    insertComment(currentPhoto.comments[i]);
  }

  loadedComments = next;
  commentsCounter.textContent = `${loadedComments} из ${total} комментариев`;

  if (loadedComments >= total) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const preparePreview = () => {
  image.src = currentPhoto.url;
  description.textContent = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  commentsCount.textContent = currentPhoto.comments.length.toString();

  removeAllChildren(commentsContainer);
  renderCommentsPortion();
};

export const photoMiniatureClickListener = (photo) => {
  currentPhoto = photo;
  preparePreview();
  openPreviewModal();
};

modalCloseButton.addEventListener('click', closePreviewModal);
commentsLoader.addEventListener('click', renderCommentsPortion);

function onEscapeClick(event) {
  if (isKeyEscape(event.key)) {
    closePreviewModal();
  }
}
