import { result } from 'lodash';
import { API_HOST } from '../utils/constants';
import { GetToken } from './auth';

export function getUser(id) {
  const url = `${API_HOST}/profile?id=${id}`;
  console.log('url', url);
  const params = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${GetToken()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => result)
    .catch((err) => err);
}

export function uploadBanner(file) {
  const url = `${API_HOST}/setBanner`;
  console.log('🆘', GetToken());
  const formData = new FormData();
  formData.append('banner', file);

  const params = {
    method: 'POST',
    headers: {
      Authorization: `${GetToken()}`,
    },
    body: formData,
  };
  return fetch(url, params)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log('🆘', err);
      return err;
    });
}

export function uploadAvatar(file) {
  const url = `${API_HOST}/setAvatar`;
  console.log('🆘', GetToken());
  const formData = new FormData();
  formData.append('avatar', file);

  const params = {
    method: 'POST',
    headers: {
      Authorization: `${GetToken()}`,
    },
    body: formData,
  };
  return fetch(url, params)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log('🆘', err);
      return err;
    });
}

export function updateInfo(data) {
  const url = `${API_HOST}/modProfile`;

  const params = {
    method: 'PUT',
    headers: {
      Authorization: `${GetToken()}`,
    },
    body: JSON.stringify(data),
  };
  console.log('REQ:', params);
  return fetch(url, params)
    .then((response) => {
      console.log('🆘', response);
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}
