export interface AccountResponse {
  id: string;
  name: string;
  phone: string;
  object: string;
  website: string;
  address: Address;
  metadata: Record<string, any>;
}

export interface Address {
  city: string;
  state: string;
  line1: string;
  line2: string;
  country: string;
  postal_code: string;
}
