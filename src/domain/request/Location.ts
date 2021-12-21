export default interface AddressPayload {
  city: string;
  state: string;
  line2: string;
  line1: string;
  country: string;
  postal_code: string;
}

export interface LocationDetailParams {
  logo?: string;
  phone?: string;
  website?: string;
  display_name: string;
  address: AddressPayload;
}

export interface ListAllLocationQueryParams {
  limit?: number;
  ending_before?: number;
  starting_after?: number;
}
