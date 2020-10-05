import axios from 'axios';

const signupFID = (username, profileImg) => {
  return axios
  .post('/authFID/signup', {username, profileImg})
  .then(response => response.data)
  .catch(err => err.response.data)
};

// const loginFID = (username, ) => {
//   return axios
//   .post('/auth/loginFID', {username, })
//   .then(response => response.data)
//   .catch(err => err.response.data)
// };

export { signupFID, loginFID};