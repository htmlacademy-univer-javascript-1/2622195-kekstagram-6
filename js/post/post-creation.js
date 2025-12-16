import {isKeyEscape} from '../utils.js';
import {submitPost} from '../api.js';
import {showErrorMessage, showSuccessMessage} from '../modal-messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const postModal = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const form = document.querySelector('.img-upload__form');
const selectedImage = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const openPostModal = () => {
  postModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeClick);
};

const closePostModal = (resetForm = true) => {
  postModal.classList.add('hidden');
  body.classList.remove('modal-open');

  if (resetForm) {
    form.reset();
  }
  document.removeEventListener('keydown', onEscapeClick);
};

const openImage = () => {
  const file = selectedImage.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
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
  submitPost(formData)
    .then(() => {
      closePostModal();
      showSuccessMessage();
    })
    .catch(() => {
      closePostModal(false);
      showErrorMessage();
    });
};
