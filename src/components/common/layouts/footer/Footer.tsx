import React from 'react';

/**
 * Footer component.
 *
 * @returns {React.ReactElement}
 */
const Footer: React.FC = (): React.ReactElement => {
  return (
    <div className="footer">
      <div className="copyright small">
        <span className="color-gray-75">© Copper</span>
        <span className="mx-6x">
          <a className="link" target="_blank" rel="noopener noreferrer" href="https://usecopper.com/contact">
            Contact
          </a>
        </span>
        <span>
          <a className="link" target="_blank" rel="noopener noreferrer" href="https://usecopper.com/privacy">
            Privacy &amp; terms
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
