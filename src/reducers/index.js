import { combineReducers } from 'redux';
import manageDonations from './manageDonations';

export default combineReducers({
  donations: manageDonations
});
