import { Storage } from 'aws-amplify';

import http from 'utils/http';
import config from 'config/config';
import { stringify } from 'utils/query';
import LocationResponse from 'domain/response/Location';
import { LocationDetailParams } from 'domain/request/Location';
import { EditLocationFormValues } from 'domain/misc/locations/Locations';

/**
 * Creates a new location object.
 *
 * @param {LocationDetailParams} payload
 *
 * @returns {Promise<LocationResponse>}
 */
export const createLocation = async (payload?: LocationDetailParams): Promise<LocationResponse> => {
  const url = config.endpoints.location.createLocation;
  const { data } = await http.post(url, payload);

  return data;
};

/**
 * Retrieves a location object by ID.
 *
 * @param {string} locationId
 *
 * @returns {Promise<LocationResponse>}
 */
export const fetchLocationById = async (locationId: string): Promise<LocationResponse> => {
  const url = config.endpoints.location.fetchALocationById.replace(':locationId', locationId);
  const { data } = await http.get(url);

  return data;
};

/**
 * Updates a location by Id.
 *
 * @param {string} locationId
 * @param {LocationDetailParams} payload
 *
 * @returns {Promise<LocationResponse>}
 */
export const updateLocation = async (locationId: string, payload: LocationDetailParams): Promise<LocationResponse> => {
  const logo = payload.logo;

  if (logo) {
    await uploadImage(`${locationId}/original.png`, logo);
    delete payload.logo;
  }

  const url = config.endpoints.location.updateLocation.replace(':locationId', locationId);
  const { data } = await http.post(url, stringify(payload, { addQueryPrefix: false, skipNulls: false }));

  return { ...data, logo };
};

/**
 * Delete a location by id.
 *
 * @param {string} locationId
 *
 * @returns {Promise<LocationResponse>}
 *
 */
export const deleteLocation = async (locationId: string) => {
  const url = config.endpoints.location.deleteLocation.replace(':locationId', locationId);
  const { data } = await http.delete(url);

  return data;
};

/**
 * Returns a list of location objects.
 *
 * @returns {Promise<LocationResponse[]>}
 */
export const fetchAllLocation = async (): Promise<LocationResponse[]> => {
  const url = config.endpoints.location.fetchAllLocations;
  const { data } = await http.get(url);
  const locations: LocationResponse[] = data.data;

  return normalizeData(locations);
};

/**
 * Normalize locations data
 *
 * @param locations
 *
 * @returns {Promise<LocationResponse[]>}
 */
const normalizeData = async (locations: LocationResponse[]): Promise<LocationResponse[]> => {
  const promises = locations.map(async (location: LocationResponse) => {
    const key = config.endpoints.location.locationLogo.replace(':locationId', location.id);
    const path = await getImage(key);

    return { ...location, logo: path };
  });

  return Promise.all(promises);
};

/**
 * Returns initial location data.
 *
 * @returns {LocationResponse}
 */
export const getLocationInitialData = (): LocationResponse => ({
  id: '',
  logo: '',
  phone: '',
  object: '',
  website: '',
  address: {
    city: '',
    state: '',
    line2: '',
    line1: '',
    country: '',
    postal_code: '',
  },
  display_name: '',
});

/**
 * Returns initial edit form values.
 *
 * @param {LocationResponse} location
 *
 * @returns {EditLocationFormValues}
 */
export const getInitialEditFormValues = (location: LocationResponse): EditLocationFormValues => ({
  logo: location?.logo || '',
  phone: location?.phone || '',
  website: location?.website || '',
  city: location?.address?.city || '',
  state: location?.address?.state || '',
  address2: location?.address?.line2 || '',
  address1: location?.address?.line1 || '',
  locationName: location.display_name || '',
  zip: location?.address?.postal_code || '',
  countryName: location?.address?.country || '',
});

/**
 * Get image from s3 bucket.
 *
 * @param {string} key
 *
 * @returns {Promise<any>}
 */
export const getImage = async (key: string): Promise<any> => {
  return Storage.get(key, {
    level: 'private',
    contentType: 'image/png',
  });
};

/**
 * Uploads image to s3 bucket.
 *
 * @param {string} key
 * @param {string} path
 *
 * @returns {Promise<object>}
 */
export const uploadImage = async (key: string, path: string): Promise<object> => {
  const response = await fetch(path);

  const blob = await response.blob();

  return Storage.put(key, blob, {
    level: 'private',
    contentType: 'image/png',
  });
};
