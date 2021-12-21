/* tslint:disable */
import http from 'utils/http';
import config from 'config/config';
import { stringify } from 'utils/query';
import { convertToDecimalPrecision } from 'utils/helper';
import { TicketResponseData } from 'domain/response/Tickets';
import { PaginationOptions } from 'domain/request/Pagination';
import { TicketDetailsPayload } from 'domain/misc/tickets/Ticket';
import { CONVERT_TO_DOLLAR, DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';

/**
 * Fetch all tickets data.
 *
 * @returns {Promise<TicketResponseData>}
 */
export async function fetchTickets(
  endDate: number | null,
  startDate: number | null,
  pagination: PaginationOptions,
  locationId?: string,
  search?: string
): Promise<TicketResponseData> {
  const queryObject = {
    search_query: search,
    location: locationId,
    limit: pagination.limit,
    ending_before: pagination?.ending_before,
    starting_after: pagination?.starting_after,
    created: { gte: startDate, lte: endDate },
  };

  const URI = config.endpoints.tickets.fetchTickets;

  const URL = URI.concat(stringify(queryObject));

  const { data } = await http.get(URL);

  return normalizeTicketData(data, pagination.ending_before);
}

/**
 * Normalize ticket data.
 *
 * @param {TicketResponseData} data
 *
 * @returns {TicketResponseData}
 */
const normalizeTicketData = (data: TicketResponseData, pagination?: string): TicketResponseData => {
  const ticketData = !!pagination ? data.data.reverse() : data.data;
  const normalizedData = ticketData.map((ticketData) => {
    const total = ticketData.total / CONVERT_TO_DOLLAR || 0;

    return {
      ...ticketData,
      total: +convertToDecimalPrecision(total, DEFAULT_DECIMAL_PRECISION), // toFixed returns string coverting it back to number using + symbol
      currency: ticketData?.currency?.toUpperCase() || '',
    };
  });

  return { data: normalizedData, has_more: data.has_more };
};

/**
 * Fetch ticket by ticket by id.
 *
 * @param {string} ticketId
 *
 * @returns {Promise<TicketDetailsPayload>}
 */
export const fetchTicketDetailById = async (ticketId: string): Promise<TicketDetailsPayload> => {
  const defaultAddress = {
    address: {
      line1: '',
    },
  };
  const url = config.endpoints.tickets.fetchTicketById.replace(':ticketId', ticketId);
  const { data } = await http.get(url);
  const locationAddress = data.location.address ? data.location : defaultAddress;
  const total = data.total / CONVERT_TO_DOLLAR || 0;

  return {
    ...data,
    location: locationAddress,
    total: +convertToDecimalPrecision(total, DEFAULT_DECIMAL_PRECISION),
    currency: data?.currency?.toUpperCase() || '',
  };
};
