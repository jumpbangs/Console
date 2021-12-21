import { CreateLocationActions } from './createLocation';
import { UpdateLocationActions } from './updateLocation';
import { DeleteLocationActions } from './deleteLocation';
import { SelectedLocationActions } from './selectLocation';
import { FetchAllLocationActions } from './fetchAllLocations';
import { FetchLocationByIdActions } from './fetchLocationById';

type LocationActions =
  | CreateLocationActions
  | UpdateLocationActions
  | DeleteLocationActions
  | FetchAllLocationActions
  | SelectedLocationActions
  | FetchLocationByIdActions;

export default LocationActions;
