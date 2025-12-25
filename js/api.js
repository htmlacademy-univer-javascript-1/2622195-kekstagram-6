const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null, parseJson = true) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return parseJson ? response.json() : response;
    });

export const getPhotos = () => load(Route.GET_DATA);

export const submitPost = (body) => load(Route.SEND_DATA, Method.POST, body, false);
