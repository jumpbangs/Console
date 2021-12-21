import '@testing-library/jest-dom/extend-expect';

// @ts-ignore
import MutationObserver from '@sheerun/mutationobserver-shim';

window.MutationObserver = MutationObserver;
