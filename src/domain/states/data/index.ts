import Auth from './Auth';
import Home from './home';
import Devices from './devices';
import Tickets from './tickets';
import Accounts from './Account';
import Locations from './Location';
import DateRange from './DateRange';
import Transactions from './transactions';
interface DataState {
  readonly auth: Auth;
  readonly home: Home;
  readonly devices: Devices;
  readonly tickets: Tickets;
  readonly accounts: Accounts;
  readonly locations: Locations;
  readonly dateRange: DateRange;
  readonly transactions: Transactions;
}

export default DataState;
