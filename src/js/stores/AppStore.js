import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.isLoggedIn = false;
    this.user = null;
    this.bindListeners({
    
    })
  }
}

export default alt.createStore(AppStore, 'AppStore');

