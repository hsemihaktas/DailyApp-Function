import axios from 'axios';

function api() {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
}

function jsonApi() {
  return axios.create({
    baseURL: process.env.REACT_APP_JSON_API_URL,
  });
}

export { api, jsonApi };
