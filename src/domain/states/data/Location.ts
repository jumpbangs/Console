import LocationResponse from 'domain/response/Location';

interface LocationState {
  selectedLocationId: string;
  locations: LocationResponse[];
}

export default LocationState;
