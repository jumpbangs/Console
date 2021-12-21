import '@testing-library/jest-dom/extend-expect';

declare global {
  declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
