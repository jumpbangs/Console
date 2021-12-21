import config from 'config/config';

/**
 * Returns static google maps image url for given address string.
 *
 * @param {string} str
 *
 * @returns {string}
 */
export const getMapStaticUrl = (str: string): string => {
  const uri = config.endpoints.googleMaps;

  return uri
    .concat(`?center=${str}`)
    .concat(`&markers=color:blue|${str}`)
    .concat(`&zoom=15`)
    .concat(`&size=420x280`)
    .concat(`&scale=2`)
    .concat(`&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
};
