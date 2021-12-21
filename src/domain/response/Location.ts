import AddressPayload from 'domain/request/Location';

export default interface LocationResponse {
  id: string;
  logo?: string;
  object: string;
  phone?: string;
  website?: string;
  display_name?: string;
  address: AddressPayload;
  metadata?: Map<string, any> | {};
}
