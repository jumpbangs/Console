export default interface AddressPayload {
  city: string;
  state: string;
  line2: string;
  line1: string;
  country: string;
  postal_code: string;
}

export interface AccountDetailParams {
  name: string;
  phone?: string;
  website?: string;
  address: AddressPayload;
}
