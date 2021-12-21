import React from 'react';

import { logo } from 'assets/images';

/**
 * Header logo component.
 *
 * @returns {React.ReactElement}
 */
const CopperLogo: React.FC = (): React.ReactElement => {
  return (
    <div className="header-logo">
      <img src={logo} alt="coppper_logo" />
    </div>
  );
};

export default CopperLogo;
