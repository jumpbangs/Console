/**
 * Application wide configuration.
 */
const config = {
  env: process.env.NODE_ENV,
  basename: process.env.REACT_APP_BASE_NAME,
  baseURI: process.env.REACT_APP_API_BASE_URI,
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
    },
    location: {
      createLocation: '/locations',
      fetchAllLocations: '/locations',
      updateLocation: '/locations/:locationId',
      deleteLocation: '/locations/:locationId',
      locationLogo: ':locationId/original.png',
      fetchALocationById: '/locations/:locationId',
    },
    device: {
      createDevice: '/devices',
      fetchAllDevices: '/devices',
      updateDevice: '/devices/:deviceId',
      deleteDevice: '/devices/:deviceId',
      retrieveADevice: '/devices/:deviceId',
    },
    tickets: {
      fetchTickets: '/tickets',
      fetchTicketById: '/tickets/:ticketId',
    },
    transactions: {
      fetchTransactions: '/transactions',
      refunds: '/refunds',
    },
    accounts: {
      fetchAccount: '/accounts/:accountId',
      updateAccount: '/accounts/:accountId',
    },
    charts: {
      getChartData: '/charts/:id',
    },
    googleMaps: 'https://maps.googleapis.com/maps/api/staticmap',
  },
};

export default config;
