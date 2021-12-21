import React from 'react';

import EditProfile from './components/EditProfile';

/**
 * Settings page component.
 *
 * @returns {React.ReactElement}
 */
const Settings: React.FC = (): React.ReactElement => {
  return (
    <div>
      <h1 className="title border-bottom pb-3x mb-3x">Settings</h1>
      <EditProfile />
    </div>
  );
};

export default Settings;
