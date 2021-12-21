import React from 'react';
import ReactDOM from 'react-dom';

import { CloseSVGIcon } from '@react-md/material-icons';

interface ModalProps {
  hide?: () => void;
  isShown?: boolean;
  headerText: string;
  children: React.ReactNode;
}

/**
 * Modal Component.
 *
 * @param {ModalProps} props
 *
 * @returns {React.ReactElement}
 */
const Modal: React.FC<ModalProps> = (props: ModalProps): React.ReactElement => {
  const { headerText, children, isShown, hide } = props;

  /**
   * Hides the html body scrollbar when modal is opened.
   */
  React.useEffect(() => {
    isShown ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShown]);

  const modal = (
    <div className="modal">
      <div className="modal__backdrop" onClick={hide} />
      <div className="modal__wrapper">
        <div className="modal__content">
          <div className="modal__header">
            <div className="sub-title text-semibold">{headerText}</div>
            {hide && (
              <button className="btn p-0x modal__close-btn" onClick={hide}>
                <CloseSVGIcon className="rmd-icon--large" />
              </button>
            )}
          </div>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    </div>
  );

  return <> {isShown ? ReactDOM.createPortal(modal, document.body) : null} </>;
};

export default Modal;
