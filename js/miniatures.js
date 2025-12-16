import {photoMiniatureClickListener} from './fullscreen-preview.js';
import {getPhotos} from './api.js';
import {showErrorMessage} from './modal-messages.js';
import {debounce} from './utils.js';

const FILTER_DEBOUNCE_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

let originalPhotos = [];

const template = document.querySelector('template#picture').content;
const container = document.querySelector('.pictures');

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

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

const clearPhotos = () => {
  container.querySelectorAll('.picture').forEach((item) => item.remove());
};

const displayPhotos = (photosList) => {
  clearPhotos();
  photosList.forEach(insertPhotoMiniature);
};

const applyFilter = (filterId) => {
  let filteredPhotos = [];

  if (filterId === 'filter-default') {
    filteredPhotos = [...originalPhotos];
  }

  if (filterId === 'filter-random') {
    filteredPhotos = [...originalPhotos]
      .sort(() => Math.random() - 0.5)
      .slice(0, RANDOM_PHOTOS_COUNT);
  }

  if (filterId === 'filter-discussed') {
    filteredPhotos = [...originalPhotos]
      .sort((a, b) => b.comments.length - a.comments.length);
  }

  displayPhotos(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter, FILTER_DEBOUNCE_DELAY);

const onFilterClick = (evt) => {
  const { id } = evt.target;

  filterButtons.forEach((button) => {
    button.classList.toggle(
      'img-filters__button--active',
      button === evt.target
    );
  });

  debouncedApplyFilter(id);
};

const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterClick);
  });
};

export const loadPhotos = () => {
  getPhotos()
    .then((photos) => {
      originalPhotos = photos;
      displayPhotos(originalPhotos);
      showFilters();
    })
    .catch(() => {
      showErrorMessage(
        loadPhotos,
        'Не удалось загрузить фотографии',
        'Попробовать снова'
      );
    });
};
