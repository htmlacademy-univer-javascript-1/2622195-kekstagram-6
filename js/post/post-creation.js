import {isKeyEscape} from '../utils.js';
import {submitPost} from '../api.js';
import {showErrorMessage, showSuccessMessage} from '../modal-messages.js';
import {resetEffect, updateEffectPreviews} from './post-image-effects.js';
import {resetScale} from './post-image-scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const body = document.querySelector('body');
const postModal = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const form = document.querySelector('.img-upload__form');
const selectedImage = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

let objectUrl = '';

const disableSubmit = (state) => {
  submitButton.disabled = state;
  submitButton.textContent = state ? 'Публикуем...' : 'Опубликовать';
};

const clearObjectUrl = () => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = '';
  }
};

const resetFormState = () => {
  clearObjectUrl();
  form.reset();
  resetScale();
  resetEffect();
  updateEffectPreviews(DEFAULT_IMAGE);
  imagePreview.src = DEFAULT_IMAGE;
  disableSubmit(false);
};

const openPostModal = () => {
  postModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeClick);
};

const closePostModal = (resetForm = true) => {
  postModal.classList.add('hidden');
  body.classList.remove('modal-open');

  if (resetForm) {
    resetFormState();
  }
  document.removeEventListener('keydown', onEscapeClick);
};

const openImage = () => {
  const file = selectedImage.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    hashtagsInput.value = '';
    descriptionInput.value = '';
    form.dispatchEvent(new Event('pristine-reset'));
    resetScale();
    resetEffect();
    clearObjectUrl();
    objectUrl = URL.createObjectURL(file);
    imagePreview.src = objectUrl;
    updateEffectPreviews(objectUrl);
    disableSubmit(false);
    openPostModal();
  }
};

selectedImage.addEventListener('change', openImage);
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

export const createPost = (formData) => {
  disableSubmit(true);
  submitPost(formData)
    .then(() => {
      closePostModal();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage(null, 'Не удалось отправить форму', 'Попробовать ещё раз');
    })
    .finally(() => disableSubmit(false));
};
