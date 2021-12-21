import React from 'react';
import { CheckCircleSVGIcon } from '@react-md/material-icons';

/**
 * Password Created component.
 *
 * @returns {React.ReactElement}
 */
const PasswordCreated: React.FC = (): React.ReactElement => {
  return (
    <div className="message-box text-center">
      <CheckCircleSVGIcon className="check-icon" />
      <div className="text-bold sub-title my-4x">Your password was successfully set.</div>
      <div className="mb-7x">Please continue to your dashboard by logging in with the new password.</div>
      <button className="btn btn--primary">Continue</button>
    </div>
  );
};

export default PasswordCreated;
