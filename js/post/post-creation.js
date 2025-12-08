import {isKeyEscape} from '../utils.js';

const postModal = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');

const form = document.querySelector('.img-upload__form');
const selectedImage = document.querySelector('.img-upload__input');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const openPostModal = () => {
  postModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeClick);
};

const closePostModal = () => {
  postModal.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
  document.removeEventListener('keydown', onEscapeClick);
};

selectedImage.addEventListener('change', openPostModal);
closeButton.addEventListener('click', closePostModal);

const preventModalClosing = (e) => {
  if (isKeyEscape(e.key)) {
    e.stopPropagation();
  }
};

hashtagsInput.addEventListener('keydown', preventModalClosing);
descriptionInput.addEventListener('keydown', preventModalClosing);

function onEscapeClick(event) {
  if (isKeyEscape(event.key)) {
    closePostModal();
  }
}
