import {createPost} from './post-creation.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const postPristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
}, true);

const normalizeTags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);

const isValidTag = (tag) => {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return regexp.test(tag);
};

const validateTagsFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = normalizeTags(value);
  return tags.every(isValidTag);
};

const validateTagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  return normalizeTags(value).length <= 5;
};

const validateTagsUnique = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = normalizeTags(value).map((t) => t.toLowerCase());
  return new Set(tags).size === tags.length;
};

const validateDescriptionLength = (value) => {
  if (!value.trim()) {
    return true;
  }
  return value.length <= 140;
};

postPristine.addValidator(
  hashtagsInput,
  validateTagsFormat,
  'Неверный формат хэш-тега'
);
postPristine.addValidator(
  hashtagsInput,
  validateTagsCount,
  'Можно указать не более 5 хэш-тегов'
);
postPristine.addValidator(
  hashtagsInput,
  validateTagsUnique,
  'Хэш-теги не должны повторяться'
);
postPristine.addValidator(
  descriptionInput,
  validateDescriptionLength,
  'Комментарий не может быть длиннее 140 символов'
);

form.addEventListener('reset', () => postPristine.reset());
form.addEventListener('pristine-reset', () => postPristine.reset());

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isValid = postPristine.validate();

  if (isValid) {
    const formData = new FormData(e.target);
    createPost(formData);
  }
});
