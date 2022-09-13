import { API_HOST } from '../utils/constants';
import { GetToken } from './auth';

export function AddTweet(message) {
  const url = `${API_HOST}/insertarTweet`;

  const data = { mensaje: message };

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${GetToken()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        return { code: response.status, message: 'Tweet enviado.' };
      }
      return { code: 500, message: 'Error del servidor' };
    })
    .catch((err) => err);
}
export function GetTweets(idUser, page) {
  const url = `${API_HOST}/getTweets?id=${idUser}&pagina=${page}`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${GetToken()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
}

export function GetTweetsFollowers(page = 1) {
  const url = `${API_HOST}/getTweetsSeguidores?pagina=${page}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${GetToken()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
}
