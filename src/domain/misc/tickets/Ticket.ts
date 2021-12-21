import LocationResponse from 'domain/response/Location';
import { TicketData, Item, SurCharges } from 'domain/response/Tickets';

export interface TicketsSelectorPayload {
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
  metadata: Map<string, any> | {};
  checkout_url: string | null;
  location: LocationResponse | string;
}

export type TicketSelectorProps = TicketsSelectorPayload[] | TicketData[] | [];

export type TicketDetailsPayload = TicketsSelectorPayload | null;
