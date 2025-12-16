import {getPhotos} from './api.js';
import {displayPhotos} from './miniatures.js';
import {showErrorMessage} from './modal-messages.js';

const loadPhotos = () => {
  getPhotos()
    .then(displayPhotos)
    .catch(() => {
      showErrorMessage(
        loadPhotos,
        'Не удалось загрузить фотографии',
        'Попробовать снова'
      );
    });
};

loadPhotos();
