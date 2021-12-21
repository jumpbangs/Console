import React from 'react';
import SpinnerProps from 'domain/misc/common/Spinner';

/**
 * Spinner Component
 *
 * - For button use isSmall props.
 *
 * @param {SpinnerProps} props
 *
 * @returns {React.ReactElement}
 */
const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps): React.ReactElement => {
  const { isSmall } = props;

  return (
    <div className={`spinner-container ${isSmall ? 'spinner-container--small' : ''}`}>
      <div className="spinner" />
    </div>
  );
};

export default Spinner;
