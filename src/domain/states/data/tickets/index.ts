import { Tickets } from './Tickets';
import { TicketDetails } from './TicketDetails';
import { TicketPagination } from './TicketPagination';
import { FetchTicketDetailById } from './FetchTicketDetailById';

interface TicketState {
  readonly tickets: Tickets;
  readonly ticketDetails: TicketDetails;
  readonly ticketPagination: TicketPagination;
  readonly ticketDetailById: FetchTicketDetailById;
}

export default TicketState;
