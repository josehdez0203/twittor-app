import { API_HOST, TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';
import { fa0 } from '@fortawesome/free-solid-svg-icons';
export function SignUp(user) {
  console.log('🆎', user);
  const tempUser = {
    nombre: user.nombre,
    apellidos: user.apellidos,
    password: user.password,
    email: user.email.toLowerCase(),
    fechaNacimiento: new Date(),
  };
  const url = `${API_HOST}/registro`;
  console.log('API: ', url);
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempUser),
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: 'Email no disponible' };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function SignIn(user) {
  const url = `${API_HOST}/login`;
  console.log('API: ', url);
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email.toLowerCase(),
      password: user.password,
    }),
  };
  console.log('🆘', user);
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: 'Usuario o contraseña incorrectos' };
    })
    .then((result) => {
      console.log('JHC', result);
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function SetTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function GetToken() {
  return localStorage.getItem(TOKEN);
}
export function LogOut() {
  localStorage.removeItem(TOKEN);
}
export function isLoged() {
  const token = GetToken();
  if (!token) {
    LogOut();
    return null;
  }
  // console.log(isExpired(token));
  if (isExpired(token)) {
    LogOut();
  }
  return jwtDecode(token);
}

function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeOut = expire - Date.now();
  return timeOut < 0;
}
