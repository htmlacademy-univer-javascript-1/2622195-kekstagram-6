const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
};

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const DEFAULT_SLIDER_SETTINGS = {
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step
};

const imagePreview = document.querySelector('.img-upload__preview img');

const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectNoneRadio = document.getElementById('effect-none');
const effectsPreviewItems = document.querySelectorAll('.effects__preview');

let currentEffect = 'none';

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

const applySliderOptions = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });

  effectLevelSlider.noUiSlider.set(effect.max);
};

const updateEffect = () => {
  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
    effectLevelContainer.classList.add('hidden');
    effectLevelValue.value = DEFAULT_SLIDER_SETTINGS.start;
    return;
  }

  const effect = EFFECTS[currentEffect];
  effectLevelContainer.classList.remove('hidden');
  imagePreview.style.filter = `${effect.filter}(${effectLevelValue.value}${effect.unit})`;
};

const onEffectChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentEffect = evt.target.value;
    const effect = EFFECTS[currentEffect];

    applySliderOptions(effect);
    updateEffect();
  }
};

export const resetEffect = () => {
  currentEffect = 'none';
  effectNoneRadio.checked = true;
  applySliderOptions(EFFECTS.none);
  updateEffect();
};

export const updateEffectPreviews = (url = DEFAULT_IMAGE) => {
  effectsPreviewItems.forEach((preview) => {
    preview.style.backgroundImage = `url('${url}')`;
  });
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  updateEffect();
});
effectsList.addEventListener('change', onEffectChange);

updateEffectPreviews();
effectLevelContainer.classList.add('hidden');
