import React from 'react';
import { CheckCircleSVGIcon } from '@react-md/material-icons';

import Modal from 'components/common/modal';

interface PasswordChangedProps {
  isShown: boolean;
  onDone: () => void;
}

type InjectedProps = PasswordChangedProps;

/**
 * Password changed modal component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const PasswordChanged: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { isShown, onDone } = props;

  return (
    <Modal headerText="" isShown={isShown}>
      <div className="success-modal message-box mt-0x">
        <CheckCircleSVGIcon className="message-box__icon" style={{ fill: '#1CA672' }} />
        <div className="sub-title text-semibold my-6x">Password changed</div>
        <p className="text-center">
          Your password has been successfully changed. Please proceed to sign in with your new password.
        </p>
      </div>
      <button className="btn btn--block btn--primary mt-14x" onClick={onDone}>
        Continue to sign in
      </button>
    </Modal>
  );
};

export default PasswordChanged;
