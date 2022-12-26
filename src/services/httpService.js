import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  
  if (!expectedError) {
    console.log('Error', error);
    alert('An unexpected error occured.');
  }
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

function clearJwt() {
  delete axios.defaults.headers.common['x-auth-token'];
}

const exported = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  clearJwt,
};

export default exported;