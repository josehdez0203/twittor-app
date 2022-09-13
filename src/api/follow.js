import { API_HOST } from '../utils/constants';
import { GetToken } from './auth';

export function CheckFollow(idUser) {
  const url = `${API_HOST}/consultaRelacion?id=${idUser}`;
  const params = {
    headers: {
      Authorization: `${GetToken()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function Follow(idUser) {
  const url = `${API_HOST}/seguir?id=${idUser}`;
  const params = {
    method: 'POST',
    headers: {
      Authorization: `${GetToken()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function Unfollow(idUser) {
  const url = `${API_HOST}/noSeguir?id=${idUser}`;
  const params = {
    method: 'DELETE',
    headers: {
      Authorization: `${GetToken()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function getUsers(paramsUrl) {
  const url = `${API_HOST}/getUsers?${paramsUrl}`;

  const params = {
    headers: {
      Authorization: `${GetToken()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}
