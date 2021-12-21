import axios from 'axios';

import config from 'config/config';

/**
 * Http Utility.
 */
const http = axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export { http as default };
