const axios = require('axios')

const apiService = axios.create({
  // baseURL: 'https://g1.globo.com/'
});

module.exports = apiService;