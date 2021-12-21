export interface TransactionResponseData {
  id: string;
  created: Date;
  status: string;
  object: string;
  ticket: string;
  amount: number;
  currency: string;
  declined: boolean;
  refunded: boolean;
  tip_amount: number;
  customer: Customer;
  receipt_url: string;
  approval_code: string;
  refunded_amount: number;
  metadata: Map<string, any> | {};
  payment_method: PaymentMethod;
}

export interface TransactionResponse {
  data: TransactionResponseData[];
  has_more: boolean;
}

interface PaymentMethod {
  card: Card;
  type: string;
  entry_mode: string;
}

interface Card {
  brand: string;
  last4: string;
}

interface Customer {
  name: string;
}
