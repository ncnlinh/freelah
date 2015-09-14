import alt from '../alt';
import AppActions from '../actions/AppActions';
import AppConstants from '../constants/AppConstants';

class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.user = null;
    this.app = AppConstants.SCREEN_HOME;
    this.bindListeners({
    
    })
  }
}

export default alt.createStore(AppStore, 'AppStore');

