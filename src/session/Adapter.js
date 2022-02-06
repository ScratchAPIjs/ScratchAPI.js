'use strict';

const Axios = require('axios');
const { Error } = require('../errors');

class AxiosAdapter {
  constructor(config) {
    this.axios = Axios.create(config);

    this.axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        throw new Error('REQUEST_INVALID', error.body);
      },
    );
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        //throw new Error("RESPONSE_ERRORED", error.body);
        return error;
      },
    );
    this.defaults = this.axios.defaults;
  }

  request(...options) {
    return this.axios.request(...options);
  }
  get(...options) {
    return this.axios.get(...options);
  }
  delete(...options) {
    return this.axios.delete(...options);
  }
  head(...options) {
    return this.axios.head(...options);
  }
  options(...options) {
    return this.axios.options(...options);
  }
  post(...options) {
    return this.axios.post(...options);
  }
  put(...options) {
    return this.axios.put(...options);
  }
  patch(...options) {
    return this.axios.patch(...options);
  }

  getUri(...options) {
    return this.axios.getUri(...options);
  }
}

module.exports = { AxiosAdapter };
