import AuthActions from 'actions/auth';
import HomeActions from 'actions/home';
import DeviceActions from 'actions/device';
import TicketsActions from 'actions/tickets';
import AccountActions from 'actions/account';
import LocationActions from 'actions/location';
import TransactionActions from 'actions/transactions';
import { SetDateRangeAction } from 'actions/setDateRange/setDateRange';

type AppActions =
  | AuthActions
  | HomeActions
  | DeviceActions
  | AccountActions
  | TicketsActions
  | LocationActions
  | SetDateRangeAction
  | TransactionActions;

export default AppActions;
