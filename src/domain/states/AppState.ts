import UiState from './ui';
import DataState from './data';

/**
 * Global app state.
 */
interface AppState {
  readonly ui: UiState;
  readonly data: DataState;
}

export default AppState;
