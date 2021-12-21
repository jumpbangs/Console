import { UpdateAccountActions } from './updateAccount';
import { FetchAccountByIdActions } from './fetchAccountById';

type ProfileActions = FetchAccountByIdActions | UpdateAccountActions;

export default ProfileActions;
