import React from 'react';
import { WarningSVGIcon } from '@react-md/material-icons';

/**
 * Empty state component.
 *
 * @returns {React.ReactElement}
 */
const EmptyState: React.FC = (): React.ReactElement => {
  return (
    <div className="empty-state-container mt-16x">
      <div className="message-box">
        <WarningSVGIcon className="message-box__icon" />
        <div className="color-gray-100 mt-3x">Sorry, no data available</div>
      </div>
    </div>
  );
};

export default EmptyState;
