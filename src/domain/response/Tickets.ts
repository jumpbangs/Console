import LocationResponse from 'domain/response/Location';

/**
 * Tickets response.
 */
export interface TicketData {
  id: string;
  dob: Date;
  name: string;
  time: string;
  items: Item[];
  total: number;
  guests: number;
  object: string;
  server: string;
  payments: any[];
  discounts: any[];
  currency: string;
  subtotal: number;
  reference: string;
  surcharges: SurCharges;
  checkout_url: string | null;
  metadata: Map<string, any> | {};
  location: LocationResponse | string;
}

export interface TicketResponseData {
  data: TicketData[];
  has_more: boolean;
}

export interface SurCharges {
  amount: number;
  label: string;
}

export interface Item {
  amount: number;
  label: string;
  quantity: number;
}
