export const getRandomIntFromRange = (start, end) => {
  const lower = Math.ceil(Math.min(start, end));
  const upper = Math.floor(Math.max(start, end));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];
