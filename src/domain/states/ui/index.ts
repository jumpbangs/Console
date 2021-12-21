import Auth from './Auth';
import Home from './Chart';
import Device from './Device';
import Tickets from './Tickets';
import Account from './Account';
import Location from './Location';
import Transaction from './Transaction';

interface UiState {
  readonly home: Home;
  readonly auth: Auth;
  readonly devices: Device;
  readonly tickets: Tickets;
  readonly accounts: Account;
  readonly locations: Location;
  readonly transactions: Transaction;
}

export default UiState;
