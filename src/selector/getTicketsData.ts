import AppState from 'domain/states/AppState';
import { TicketSelectorProps } from 'domain/misc/tickets/Ticket';

/**
 * Get formatted tickets data from redux store.
 *
 * @param {AppState} state
 *
 * @returns {TicketsSelectorProps}
 */
export const getTicketsData = (state: AppState): TicketSelectorProps => {
  const tickets = state.data.tickets.tickets;
  const locations = state.data.locations.locations;

  if (!tickets.data.length) {
    return [];
  }

  if (!locations.length) {
    return tickets.data;
  }

  if (!locations.length || !tickets.data.length) {
    return [];
  }

  return tickets.data.map((ticket) => {
    const locationId = ticket.location;

    return {
      ...ticket,
      location: locations.find((location) => location.id === locationId) || locationId || '',
    };
  });
};
