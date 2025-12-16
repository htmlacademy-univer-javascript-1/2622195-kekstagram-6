import {isKeyEscape} from './utils.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const showMessage = (success, onAction, customTitle, customButtonText) => {
  const template = success ? successTemplate : errorTemplate;
  const titleClass = success ? '.success__title' : '.error__title';
  const buttonClass = success ? '.success__button' : '.error__button';

  const element = template.cloneNode(true);
  const section = element.querySelector('section');
  const button = element.querySelector(buttonClass);

  if (customTitle) {
    element.querySelector(titleClass).textContent = customTitle;
  }
  if (customButtonText) {
    button.textContent = customButtonText;
  }

  body.append(section);
  body.classList.add('modal-open');

  const closeMessage = () => {
    section.remove();
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEsc);
  };

  function onEsc(e) {
    if (isKeyEscape(e.key)) {
      closeMessage();
    }
  }

  button.addEventListener('click', () => {
    closeMessage();

    if (onAction) {
      onAction();
    }
  });

  section.addEventListener('click', (e) => {
    if (e.target === section) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', onEsc);
};

export const showErrorMessage = (onAction = null, customTitle = null, customButtonText = null) => {
  showMessage(false, onAction, customTitle, customButtonText);
};

export const showSuccessMessage = () => showMessage(true);
