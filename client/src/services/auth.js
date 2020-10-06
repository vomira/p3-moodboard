import axios from 'axios';

const signup = (username, password) => {
  return axios
  .post('/auth/signup', {username, password})
  .then(response => response.data)
  .catch(err => err.response.data)
};


const signupFID = (username, profileImg) => {
  return axios
  .post('/auth/signupFID', {username, profileImg})
  .then(response => response.data)
  .catch(err => err.response.data)
};


const login = (username, password) => {
  return axios
  .post('/auth/login', {username, password})
  .then(response => response.data)
  .catch(err => err.response.data)
};

const loginFID = (username, loginImg) => {
  return axios
  .post('/auth/loginFID', {username, loginImg})
  .then(response => response.data)
  .catch(err => err.response.data)
}

const logout = () => {
  localStorage.clear();
  return axios
  .delete('/auth/logout')
  .then(response => response.data)
  .catch(err => err.response.data)
};

export { signup, signupFID, login, loginFID, logout };