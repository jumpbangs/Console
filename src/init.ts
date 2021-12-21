import Amplify from 'aws-amplify';

import http from 'utils/http';
import awsconfig from 'aws-exports';
import * as interceptors from 'commons/interceptor';

/**
 * Initialize interceptors for the application.
 */
async function initInterceptors() {
  http.interceptors.request.use(interceptors.requestInterceptor as any);
  http.interceptors.response.use(
    (response: any) => response,
    /**
     * This interceptor checks if the response had a 401 status code, which means
     * that the access token used for the request has expired. It then refreshes
     * the access token and resends the original request.
     */
    interceptors.responseInterceptor
  );
}

/**
 * Configure Amplify for Auth.
 */
function configureAmplify() {
  Amplify.configure(awsconfig);
}

export default function init() {
  configureAmplify();
  initInterceptors();
}
