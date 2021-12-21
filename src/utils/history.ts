import { createBrowserHistory } from 'history';

import config from 'config/config';

export default createBrowserHistory({ basename: config.basename });
