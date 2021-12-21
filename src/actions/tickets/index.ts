import { FetchTicketsActions } from './fetchTickets';
import { FetchTicketByIdActions } from './fetchTicketById';
import { SetTicketDetailsActions } from './setTicketDetails';
import { SetTicketPaginationActions } from './ticketPagination';
import { TicketActions as TicketDefaultActions } from './tickets';

type TicketsActions =
  | FetchTicketsActions
  | TicketDefaultActions
  | FetchTicketByIdActions
  | SetTicketDetailsActions
  | SetTicketPaginationActions;

export default TicketsActions;
