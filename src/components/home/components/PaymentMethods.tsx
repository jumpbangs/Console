import React from 'react';

import DonughtChart from './donughtChart';
import { paymentMethodsData } from './data';

/**
 * Payment methods component.
 *
 * @returns {React.ReactElement}
 */
const PaymentMethods: React.FC = (): React.ReactElement => {
  return (
    <div className="payment-methods-section left pb-8x">
      <h3 className="mt-6x mb-5x">Payment methods</h3>
      <div className="pie-chart">
        <DonughtChart data={paymentMethodsData} />
      </div>
    </div>
  );
};

export default PaymentMethods;
