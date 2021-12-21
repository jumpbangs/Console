interface RefundResponse {
  id: string;
  created: Date;
  amount: number;
  status: string;
  object: string;
  currency: string;
  transaction: string;
  reason: string | null;
  reference: string | null;
  metadata: Map<string, any> | {};
}

export default RefundResponse;
