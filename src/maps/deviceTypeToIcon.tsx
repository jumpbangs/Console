import React from 'react';

import DeviceType from 'enums/DeviceType';
import { CopperCord, PoyntP5, PoyntTerminal, PaxA60, PaxA920 } from '../assets/icons';

/**
 * Maps given device type to respective symbols.
 */
export const deviceTypeToIconMap = {
  [DeviceType.PAX_A60]: <PaxA60 className="rmd-icon--large" />,
  [DeviceType.PONYNT_5]: <PoyntP5 className="rmd-icon--large" />,
  [DeviceType.PAX_A920]: <PaxA920 className="rmd-icon--large" />,
  [DeviceType.COPPER_CORD]: <CopperCord className="rmd-icon--large" />,
  [DeviceType.PONYNT_TERMINAL]: <PoyntTerminal className="rmd-icon--large" />,
};
